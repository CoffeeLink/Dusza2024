use std::convert::Into;
use std::os::unix::process::parent_id;
use actix_web::web::ServiceConfig;
use actix_web::{delete, get, post, put, web, HttpResponse, Responder, ResponseError};
use derive_more::Display;
use log::error;
use serde::{Deserialize, Serialize};
use crate::auth::AuthToken;
use crate::{AuthConfig, Database};
use crate::error::{DuszaBackendError, NoError};
use crate::models::DBError;
use crate::models::school::SchoolData;
use crate::auth;
use crate::error::AuthorizationError::Unauthorized;
use crate::error::DuszaBackendError::InternalError;
use crate::models::user::{User, UserType};
use crate::schools::SchoolRegistrationError::UsernameTaken;

pub fn configure_school_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/school")
        .service(get_schools)
        .service(get_school_by_id)
        .service(delete_school_by_id)
        .service(update_school_by_id)
        .service(create_school_account)
    );
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct SchoolPayload {
    pub school_name: String,
    pub school_address: String,
    pub school_rep_name: String,
    pub school_rep_email: String,
}

#[get("/")]
async fn get_schools(
    db: web::Data<Database>
) -> Result<impl Responder, DuszaBackendError<DBError>> {
    let schools = SchoolData::get_all_schools(&db)
        .await?;

    Ok(web::Json(serde_json::to_string(&schools).map_err(|e| {
        error!("SERDE SERIALIZE ERROR: {e}");
        DuszaBackendError::InternalError
    })?))
}

#[get("/{id}")]
async fn get_school_by_id(
    db: web::Data<Database>,
    path: web::Path<(u32, )>
) -> Result<impl Responder,DuszaBackendError<DBError>> {
    let school = SchoolData::get_school_by_id(path.0, &db)
        .await?
        .ok_or(DuszaBackendError::Other(DBError::NotFound))?;

    Ok(web::Json(serde_json::to_string(&school).map_err(|e| {
        error!("SERDE SERIALIZE ERROR: {e}");
        DuszaBackendError::InternalError
    })?))
}

#[delete("/{id}")]
async fn delete_school_by_id(
    db: web::Data<Database>,
    path: web::Path<(u32, )>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<DBError>> {
    let authorized = auth::verify_permission_level(auth_token, UserType::Organizer, &**db)
        .await
        .map_err(|e| DuszaBackendError::InternalError)?;

    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    SchoolData::delete_school_by_id(path.0, &**db)
        .await?;

    Ok(HttpResponse::Ok())
}

#[put("/{id}")]
async fn update_school_by_id(
    db: web::Data<Database>,
    payload: web::Json<SchoolPayload>,
    path: web::Path<(u32, )>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<DBError>> {
    let authorized = auth::verify_permission_level(auth_token.clone(), UserType::Organizer, &**db)
        .await
        .map_err(|e| DuszaBackendError::InternalError)?;

    let authorized = authorized || ({
        let user_id = User::from_auth_token(auth_token.token, &**db).await
        .map_err(|e| DuszaBackendError::InternalError)?
            .ok_or(DuszaBackendError::AuthError(Unauthorized))?
            .user_id;
        let school_owner_id = SchoolData::get_school_by_id(path.0, &**db).await
            .map_err(|_| DuszaBackendError::InternalError)?
            .ok_or(DuszaBackendError::Other(DBError::NotFound))?
            .school_id;

        school_owner_id == user_id
    });
    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    SchoolData::edit_school(
        &payload.school_name,
        &payload.school_address,
        &payload.school_rep_name,
        &payload.school_rep_email,
        path.0,
        &**db
    ).await?;

    let school = SchoolData::get_school_by_id(path.0, &**db)
        .await?
        .ok_or(DuszaBackendError::InternalError)?;

    Ok(web::Json(serde_json::to_string(&school).map_err(|e| {
        error!("SERDE SERIALIZE ERROR: {e}");
        DuszaBackendError::InternalError
    })?))
}

#[derive(Clone, Debug, Deserialize, Serialize)]
struct SchoolRegisterPayload {
    username: String,
    password: String,

    school_name: String,
    school_address: String,
    school_rep_name: String,
    school_rep_email: String,
}

#[derive(Debug, Clone, Display)]
enum SchoolRegistrationError {
    UsernameTaken
}
impl ResponseError for SchoolRegistrationError {}

#[post("/")]
async fn create_school_account(
    db: web::Data<Database>,
    payload: web::Json<SchoolRegisterPayload>,
    auth_token: AuthToken,
    auth_config: web::Data<AuthConfig>
) -> Result<impl Responder, DuszaBackendError<SchoolRegistrationError>> {
    let authorized = auth::verify_permission_level(auth_token.clone(), UserType::Organizer, &**db)
        .await
        .map_err(|e| DuszaBackendError::InternalError)?;

    if !authorized {
        return Err(DuszaBackendError::AuthError(Unauthorized))
    }

    let user = User::create_user(&payload.username, &payload.password, UserType::SchoolRepresentative, &db, &auth_config)
        .await
        .map_err(|e| DuszaBackendError::Other(UsernameTaken))?;

    let school = SchoolData::create_school_account_and_assign(
        user,
        &payload.school_name,
        &payload.school_address,
        &payload.school_rep_name,
        &payload.school_rep_email,
        &db)
        .await
        .map_err(|e| InternalError)?;

    Ok(web::Json(serde_json::to_string(&school).map_err(|e|{
        error!("SERDE SERIALIZE ERROR {e}");
        InternalError
    })?))
}