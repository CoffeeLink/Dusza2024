use crate::error::DuszaBackendError;
use actix_web::http::StatusCode;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder, ResponseError};
use actix_web::cookie::time::macros::date;
use actix_web::web::ServiceConfig;
use derive_more::Display;
use log::{error, warn};
use serde::{Deserialize, Serialize};
use sqlx::query;
use thiserror::Error;
use crate::{AuthConfig, Database};
use crate::auth::AuthToken;
use crate::category::CategoryError;
use crate::models::category::CompetitionCategory;
use crate::models::lang::ProgrammingLanguage;
use crate::models::school::SchoolData;
use crate::models::team::{SherpaTeacher, TeamApprovalState, TeamData, TeamMember};
use crate::models::user::{User, UserType};
use crate::auth;
use crate::error::AuthorizationError::Unauthorized;
use crate::error::DuszaBackendError::InternalError;
use crate::models::user::UserType::Organizer;

pub fn configure_team_endpoints(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/team")
            .service(team_put_id)
            .service(team_get_without_id)
            .service(team_get_id)
            .service(team_delete_id)
            .service(team_push_register)
            .service(team_push_approve)
            .service(team_push_disapprove),
    );
}

#[derive(Debug, Copy, Clone, Deserialize, Serialize, Display, Error)]
enum TeamError {
    TeamNotFound,
}

impl ResponseError for TeamError {
    fn status_code(&self) -> StatusCode {
        StatusCode::IM_A_TEAPOT
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct TeamUpdatePayload {
    team_name: String,
    team_members: [TeamMember; 3],
    team_replacement: Option<TeamMember>,
    team_lang_id: u32
}

#[put("/{id}")]
async fn team_put_id(
    id: web::Path<(u32,)>,
    auth_token: AuthToken,
    db: web::Data<Database>,
    data: web::Json<TeamUpdatePayload>
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let authorized = auth::verify_permission_level(auth_token.clone(), UserType::Organizer, &**db)
        .await
        .map_err(|e| DuszaBackendError::InternalError)?;

    let authorized = authorized || ({
        let user_id = User::from_auth_token(auth_token.token, &**db).await
            .map_err(|e| DuszaBackendError::InternalError)?
            .ok_or(DuszaBackendError::AuthError(Unauthorized))?
            .user_id;
        let team_owner_id = TeamData::get_team_by_id(id.0, &**db).await
            .map_err(|_| DuszaBackendError::InternalError)?
            .ok_or(DuszaBackendError::Other(TeamError::TeamNotFound))?
            .user.user_id;

        team_owner_id == user_id
    });
    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized));
    }

    TeamData::update_team_by_id(id.0, &**db, &data.team_name, data.team_members.clone(), data.team_replacement.clone(), data.team_lang_id)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;


    let team = TeamData::get_team_by_id(id.0, &**db)
        .await.map_err(|_| DuszaBackendError::InternalError)?
        .unwrap();

    if team.disapproval_message.is_some() {
        let sql = r#"
UPDATE team_data
SET dissapproval_msg = ?
WHERE team_id = ?
        "#;
        let _ = query(sql)
            .bind(None::<String>)
            .bind(id.0)
            .execute(&**db)
            .await
            .map_err(|_| DuszaBackendError::InternalError)?;
    }

    Ok(HttpResponse::Ok())
}

#[delete("/{id}")]
async fn team_delete_id(
    id: web::Path<(u32,)>,
    db: web::Data<Database>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    if !auth::verify_permission_level(auth_token, Organizer, &db).await.map_err(|_| DuszaBackendError::InternalError)? {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    TeamData::delete_team_by_id(&db, id.0)
        .await
        .map_err(|_| InternalError)?;

    Ok(HttpResponse::Ok())
}

#[get("/{id}")]
async fn team_get_id(
    id: web::Path<(u32,)>,
    db: web::Data<Database>
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let team = TeamData::get_team_by_id(id.0, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?
        .ok_or(DuszaBackendError::Other(TeamError::TeamNotFound))?;

    Ok(
        web::Json(
            serde_json::to_string(&team).map_err(|e|{
                error!("JSON ERR: {e}");
                DuszaBackendError::InternalError
            })?
        )
    )
}

#[get("/")]
async fn team_get_without_id(
    db: web::Data<Database>
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let teams = TeamData::get_all_teams(&db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    Ok(
        web::Json(
            serde_json::to_string(&teams).map_err(|e|{
                error!("JSON ERR: {e}");
                DuszaBackendError::InternalError
            })?
        )
    )
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct TeamRegistrationPayload {
    pub team_name: String,
    pub school_id: u32,
    pub members: [TeamMember; 3],
    pub replacement_member: Option<TeamMember>,
    pub category_id: u32,
    pub lang_id: u32,
    pub sherpa_teachers: Vec<String>,

    pub username: String,
    pub password: String,
}

#[post("/")]
async fn team_push_register(
    db: web::Data<Database>,
    auth_config: web::Data<AuthConfig>,
    data: web::Json<TeamRegistrationPayload>
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let usr = User::create_user(
        &data.username,
        &data.password,
        UserType::TeamAccount,
        &db,
        &auth_config,
    ).await.map_err(|_| {
        warn!("Create User Failed");
        DuszaBackendError::InternalError
    })?;

    let school = SchoolData::get_school_by_id(data.school_id, &db).await.map_err(|_| {
        warn!("Find School Failed");
        DuszaBackendError::InternalError
    })?.ok_or({
        warn!("Find school returned without a school");
        DuszaBackendError::InternalError
    })?;
    let category = CompetitionCategory::get_comp_by_id(data.category_id, &db)
        .await
        .map_err(|_| {
            warn!("Find Comp fail");
            DuszaBackendError::InternalError
        })?
        .ok_or({
            warn!("Find comp didnt find");
            DuszaBackendError::InternalError
        })?;

    let lang = ProgrammingLanguage::get_lang_by_id(data.lang_id, &db)
        .await
        .map_err(|_| {
            warn!("Find find lang failed");
            DuszaBackendError::InternalError
        })?
        .ok_or({
            warn!("Find lang returned none");
            DuszaBackendError::InternalError
        })?;

    let team = TeamData::create_and_assign_team(
        &db,
        usr,
        &data.team_name,
        school,
        data.members.clone(),
        data.replacement_member.clone(),
        category,
        lang,
        data.sherpa_teachers.clone(),
        TeamApprovalState::WaitingForApproval,
        None
    ).await
        .map_err(|e| {
            warn!("team create and assign failed: {e}");
            DuszaBackendError::InternalError
        })?;

    Ok(
        web::Json(
            serde_json::to_string(&team).map_err(|e|{
                error!("JSON ERR: {e}");
                DuszaBackendError::InternalError
            })?
        )
    )
}

#[derive(Debug, Clone, Deserialize)]
struct TeamDisapprovalPayload {
    message: String
}

#[post("/approve/{id}")]
async fn team_push_approve(
    path: web::Path<(u32, )>,
    auth_token: AuthToken,
    db: web::Data<Database>,
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let authorized = auth::verify_permission_level(auth_token, UserType::SchoolRepresentative, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    let sql = r#"
UPDATE team_data
SET approval_state = ?, dissapproval_msg = ?
WHERE team_id = ?
    "#;

    let _ = query(sql)
        .bind(TeamApprovalState::Approved)
        .bind(None::<String>)
        .bind(path.0)
        .execute(&**db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    Ok(HttpResponse::Ok())
}

#[post("/disapprove/{id}")]
async fn team_push_disapprove(
    path: web::Path<(u32, )>,
    auth_token: AuthToken,
    db: web::Data<Database>,
    data: web::Json<TeamDisapprovalPayload>
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    let authorized = auth::verify_permission_level(auth_token, UserType::SchoolRepresentative, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    let sql = r#"
UPDATE team_data
SET approval_state = ?, dissapproval_msg = ?
WHERE team_id = ?
    "#;

    let _ = query(sql)
        .bind(TeamApprovalState::WaitingForApproval)
        .bind(data.message.clone())
        .bind(path.0)
        .execute(&**db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    Ok(HttpResponse::Ok())
}