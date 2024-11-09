use crate::error::DuszaBackendError;
use crate::teams::TeamError::NumberBiggerThan4;
use actix_web::http::StatusCode;
use actix_web::{delete, get, post, put, web, Responder, ResponseError};
use derive_more::Display;
use serde::{Deserialize, Serialize};
use thiserror::Error;

pub fn configure_team_endpoints(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/team")
            .service(team_put_id)
            .service(team_get_id)
            .service(team_get_without_id)
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
async fn team_get_without_id() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}

#[post("/register")]
async fn team_push_register() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}

#[post("/approve/{id}")]
async fn team_push_approve() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}

#[post("/register/disapprove/{id}")]
async fn team_push_disapprove() -> Result<impl Responder, DuszaBackendError<TeamError>> {
    Ok(web::Json("success"))
}
