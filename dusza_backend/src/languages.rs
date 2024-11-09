use crate::auth::AuthToken;
use crate::error::AuthorizationError::Unauthorized;
use crate::error::DuszaBackendError;
use crate::languages::LangErr::NoSuchLanguage;
use crate::models::auth_token::AuthTokenData;
use crate::models::lang::ProgrammingLanguage;
use crate::models::user::{User, UserType};
use actix_web::http::StatusCode;
use actix_web::web::{service, ServiceConfig};
use actix_web::{delete, get, post, put, web, HttpResponse, Responder, ResponseError};
use derive_more::{Display, Error};
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{MySql, Pool};

pub fn configure_language_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(
        web::scope("/language")
            .service(lang_get_all)
            .service(lang_get_by_id)
            .service(lang_create)
            .service(lang_put_update)
            .service(lang_del)
    );
}

// [push]/create
// [put]/{id}
// [get]/
// [get]{id}
// [delete]/{id}

#[derive(Debug, Clone, Display)]
pub enum LangErr {
    NoSuchLanguage,
}

impl ResponseError for LangErr {
    fn status_code(&self) -> StatusCode {
        StatusCode::NOT_FOUND
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LangPayload {
    lang_name: String,
}

#[post("/create")]
async fn lang_create(
    db: web::Data<Pool<MySql>>,
    create_lang_payload: web::Json<LangPayload>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    // get permission level (Org)
    let user = User::from_auth_token(auth_token.token, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::AuthError(Unauthorized))?;
    if user.user_type != UserType::Organizer {
        return Err(DuszaBackendError::AuthError(Unauthorized));
    }

    let lang = ProgrammingLanguage::create_lang(create_lang_payload.lang_name.clone(), &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    Ok(web::Json(serde_json::to_string_pretty(&lang).map_err(
        |e| {
            error!("{e}");
            DuszaBackendError::InternalError
        },
    )?))
}

#[put("/{id}")]
async fn lang_put_update(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32, )>,
    lang_payload: web::Json<LangPayload>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    // get permission level (Org)
    let user = User::from_auth_token(auth_token.token, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::AuthError(Unauthorized))?;
    if user.user_type != UserType::Organizer {
        return Err(DuszaBackendError::AuthError(Unauthorized));
    }

    let changes = ProgrammingLanguage::edit_lang_by_id(id.0, lang_payload.lang_name.clone(), &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    Ok(web::Json(serde_json::to_string_pretty(&changes).map_err(
        |e| {
            error!("{e}");
            DuszaBackendError::InternalError
        },
    )?))
}

#[delete("/{id}")]
async fn lang_del(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32, )>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    let user = User::from_auth_token(auth_token.token, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::AuthError(Unauthorized))?;
    if user.user_type != UserType::Organizer {
        return Err(DuszaBackendError::AuthError(Unauthorized));
    }

    ProgrammingLanguage::delete_lang_by_id(id.0, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    Ok(HttpResponse::new(StatusCode::OK))
}

#[get("/")]
async fn lang_get_all(
    db: web::Data<Pool<MySql>>,
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    let languages = ProgrammingLanguage::get_all(&**db).await.map_err(|e| {
        error!("{}", e);
        DuszaBackendError::InternalError
    })?;

    Ok(web::Json(
        serde_json::to_string_pretty(&languages).map_err(|e| {
            error!("{}", e);
            DuszaBackendError::InternalError
        })?,
    ))
}

#[get("/{id}")]
async fn lang_get_by_id(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32,)>,
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    let lang = ProgrammingLanguage::get_lang_by_id(id.0, &**db)
        .await
        .map_err(|e| {
            error!("{}", e);
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::Other(NoSuchLanguage))?;

    Ok(web::Json(serde_json::to_string_pretty(&lang).map_err(
        |e| {
            error!("{e}");
            DuszaBackendError::InternalError
        },
    )?))
}
