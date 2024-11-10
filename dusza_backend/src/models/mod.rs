use actix_web::ResponseError;
use derive_more::Display;
use http::StatusCode;

pub mod auth_token;
pub mod category;
pub mod lang;
pub mod school;
pub mod user;
mod team;

#[derive(Debug, Copy, Clone, Display)]
pub enum DBError {
    NotFound,
}

impl ResponseError for DBError {
    fn status_code(&self) -> StatusCode {
        StatusCode::NOT_FOUND
    }
}
