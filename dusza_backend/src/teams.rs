use crate::error::DuszaBackendError;
use crate::teams::TeamError::NumberBiggerThan4;
use actix_web::http::StatusCode;
use actix_web::{delete, get, post, put, web, Responder, ResponseError};
use actix_web::cookie::time::macros::date;
use actix_web::web::ServiceConfig;
use derive_more::Display;
use log::error;
use serde::{Deserialize, Serialize};
use thiserror::Error;
use crate::{AuthConfig, Database};
use crate::category::CategoryError;
use crate::models::category::CompetitionCategory;
use crate::models::lang::ProgrammingLanguage;
use crate::models::school::SchoolData;
use crate::models::team::{SherpaTeacher, TeamApprovalState, TeamData, TeamMember};
use crate::models::user::{User, UserType};

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
    NumberBiggerThan4,
}

impl ResponseError for TeamError {
    fn status_code(&self) -> StatusCode {
        StatusCode::IM_A_TEAPOT
    }
}

#[put("/{id}")]
async fn team_put_id(
    id: web::Path<(u32,)>,
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    if id.0 > 4u32 {
        Err(DuszaBackendError::Other(TeamError::NumberBiggerThan4))
    } else {
        Ok(web::Json("Hi"))
    }
}

#[delete("/{id}")]
async fn team_delete_id(
    id: web::Path<(u32,)>,
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("Grr"))
}

#[get("/{id}")]
async fn team_get_id(
    id: web::Path<(u32,)>,
) -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json(format!("{:?}", id)))
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
    ).await.map_err(|_| {DuszaBackendError::InternalError})?;

    let school = SchoolData::get_school_by_id(data.school_id, &db).await.map_err(|_| {DuszaBackendError::InternalError})?.ok_or({DuszaBackendError::InternalError})?;
    let category = CompetitionCategory::get_comp_by_id(data.category_id, &db)
        .await
        .map_err(|_| {DuszaBackendError::InternalError})?
        .ok_or({DuszaBackendError::InternalError})?;

    let lang = ProgrammingLanguage::get_lang_by_id(data.lang_id, &db)
        .await
        .map_err(|_| {DuszaBackendError::InternalError})?
        .ok_or({DuszaBackendError::InternalError})?;

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

#[post("/approve/{id}")]
async fn team_push_approve() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}

#[post("/register/disapprove/{id}")]
async fn team_push_disapprove() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}
