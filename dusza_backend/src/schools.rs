use std::convert::Into;
use std::os::unix::process::parent_id;
use actix_web::web::ServiceConfig;
use actix_web::{delete, get, put, web, HttpResponse, Responder};
use log::error;
use serde::{Deserialize, Serialize};
use crate::auth::AuthToken;
use crate::Database;
use crate::error::{DuszaBackendError, NoError};
use crate::models::DBError;
use crate::models::school::SchoolData;
use crate::auth;
use crate::error::AuthorizationError::Unauthorized;
use crate::models::user::UserType;

pub fn configure_school_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/school")
        .service(get_schools)
        .service(get_school_by_id)
        .service(delete_school_by_id)
        .service(update_school_by_id)
    );
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct SchoolPayload {
    pub school_id: Option<u32>,
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

    Ok(web::Json(serde_json::to_string_pretty(&schools).map_err(|e| {
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

    Ok(web::Json(serde_json::to_string_pretty(&school).map_err(|e| {
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

    Ok(web::Json("Success!"))
}

#[put("/{id}")]
async fn update_school_by_id(
    db: web::Data<Database>,
    payload: web::Json<SchoolPayload>,
    path: web::Path<(u32, )>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<DBError>> {
    Ok(HttpResponse::NotImplemented())
}