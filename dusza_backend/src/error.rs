use actix_web::http::StatusCode;
use actix_web::ResponseError;
use derive_more::Display;
use std::error::Error;
use std::fmt::{Debug, Formatter};

#[derive(Debug, Clone, Display)]
pub enum DuszaBackendError<T: Debug + Clone + Display> {
    InternalError,
    AuthError(AuthorizationError),
    Other(T),
}

#[derive(Debug, Clone, Display)]
pub enum AuthorizationError {
    Unauthorized,
    InvalidAuthToken,
    IncorrectUserOrPassword,
}

impl ResponseError for AuthorizationError {
    fn status_code(&self) -> StatusCode {
        StatusCode::UNAUTHORIZED
    }
}

impl<T> ResponseError for DuszaBackendError<T>
where
    T: Debug + Clone + Display + ResponseError,
{
    fn status_code(&self) -> StatusCode {
        match self {
            DuszaBackendError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
            DuszaBackendError::AuthError(a) => a.status_code(),
            DuszaBackendError::Other(o) => o.status_code(),
        }
    }
}

#[derive(Debug, Display, Clone)]
pub enum NoError {}