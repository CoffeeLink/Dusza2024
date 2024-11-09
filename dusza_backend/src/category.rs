use actix_web::{get, post, HttpResponse, Responder, ResponseError};
use actix_web::web::ServiceConfig;
use actix_web::web;
use chrono::NaiveDateTime;
use derive_more::Display;
use http::StatusCode;
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, MySql, Pool};
use crate::auth::AuthToken;
use crate::error::DuszaBackendError;
use crate::languages::LangErr;
use crate::models::category::{CategoryState, CompetitionCategory};

pub fn configure_category_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/category/")
        .service(category_get_all)
        .service(category_get_by_id)
        .service(category_create)
    );
}

#[derive(Debug, Clone, Display)]
pub enum CategoryError {
    NoSuchCategory
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
    let categories = CompetitionCategory::get_all(&db)
        .await.map_err(|e| {
        error!("{}", e);
        DuszaBackendError::InternalError
    })?;

    Ok(web::Json(
        serde_json::to_string_pretty(&categories)
        .map_err(|e| {
        error!("{}", e);
        DuszaBackendError::InternalError
    })?
    ))
}

#[get("/{id}")]
async fn category_get_by_id(
    db: web::Data<Pool<MySql>>,
    id: web::Path<(u32, )>,
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
    category_application_state: CategoryState
}

#[post("/")]
async fn category_create(
    db: web::Data<Pool<MySql>>,
    payload: web::Json<CreateCategoryPayload>,
    auth_token: AuthToken,
) -> Result<impl Responder, DuszaBackendError<CategoryError>> {



    Ok(HttpResponse::new(StatusCode::OK))
}