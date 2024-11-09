use crate::auth::{verify_permission_level, AuthToken};
use crate::error::{AuthorizationError, DuszaBackendError};
use crate::languages::LangErr;
use crate::models::category::{CategoryState, CompetitionCategory};
use crate::models::user::UserType;
use actix_web::web::{service, ServiceConfig};
use actix_web::{delete, put, web};
use actix_web::{get, post, HttpResponse, Responder, ResponseError};
use chrono::NaiveDateTime;
use derive_more::Display;
use http::StatusCode;
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{query, FromRow, MySql, Pool};
use std::iter::Cloned;

pub fn configure_category_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(
        web::scope("/category")
            .service(category_get_all)
            .service(category_get_by_id)
            .service(category_create)
            .service(category_update)
            .service(category_delete),
    );
}

#[derive(Debug, Clone, Display)]
pub enum CategoryError {
    NoSuchCategory,
}
impl ResponseError for CategoryError {
    fn status_code(&self) -> StatusCode {
        StatusCode::NOT_FOUND
    }
}

#[get("/")]
async fn category_get_all(
    db: web::Data<Pool<MySql>>,
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    let categories = CompetitionCategory::get_all(&db).await.map_err(|e| {
        error!("{}", e);
        DuszaBackendError::InternalError
    })?;

    Ok(web::Json(
        serde_json::to_string_pretty(&categories).map_err(|e| {
            error!("{}", e);
            DuszaBackendError::InternalError
        })?,
    ))
}

#[get("/{id}")]
async fn category_get_by_id(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32,)>,
) -> Result<impl Responder, DuszaBackendError<LangErr>> {
    let categ = CompetitionCategory::get_comp_by_id(id.0, &db)
        .await
        .map_err(|e| {
            error!("{}", e);
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::Other(LangErr::NoSuchLanguage))?;

    Ok(serde_json::to_string_pretty(&categ).map_err(|e| {
        error!("{}", e);
        DuszaBackendError::InternalError
    })?)
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct CreateCategoryPayload {
    category_name: String,
    category_description: Option<String>,
    category_deadline: NaiveDateTime,
    category_state: CategoryState,
}

#[post("/")]
async fn category_create(
    db: web::Data<Pool<MySql>>,
    payload: web::Json<CreateCategoryPayload>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<CategoryError>> {
    if !verify_permission_level(auth_token, UserType::Organizer, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?
    {
        return Err(DuszaBackendError::AuthError(
            AuthorizationError::Unauthorized,
        ));
    }

    let category = payload.0;
    let category = CompetitionCategory::create_category(
        category.category_name,
        category.category_description,
        category.category_deadline,
        category.category_state,
        &db,
    )
    .await
    .map_err(|e| {
        error!("{e}");
        DuszaBackendError::InternalError
    })?;

    Ok(serde_json::to_string_pretty(&category).map_err(|e| {
        error!("{e}");
        DuszaBackendError::InternalError
    })?)
}

#[put("/{id}")]
async fn category_update(
    db: web::Data<Pool<MySql>>,
    payload: web::Json<CreateCategoryPayload>,
    id: web::Path<(u32,)>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<CategoryError>> {
    if !verify_permission_level(auth_token, UserType::Organizer, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?
    {
        return Err(DuszaBackendError::AuthError(
            AuthorizationError::Unauthorized,
        ));
    }

    let category = payload.0;
    let category = CompetitionCategory::edit_comp_by_id(
        id.0,
        category.category_name,
        category.category_description,
        category.category_deadline,
        category.category_state,
        &db,
    )
    .await
    .map_err(|e| {
        error!("{e}");
        DuszaBackendError::InternalError
    })?;

    Ok(serde_json::to_string_pretty(&category).map_err(|e| {
        error!("{e}");
        DuszaBackendError::InternalError
    })?)
}

#[delete("/{id}")]
async fn category_delete(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32,)>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<CategoryError>> {
    if !verify_permission_level(auth_token, UserType::Organizer, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?
    {
        return Err(DuszaBackendError::AuthError(
            AuthorizationError::Unauthorized,
        ));
    }

    CompetitionCategory::delete_comp_by_id(id.0, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    Ok(HttpResponse::Ok())
}
