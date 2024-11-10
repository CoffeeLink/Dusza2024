use actix_web::web::ServiceConfig;
use actix_web::{get, web, Responder, ResponseError};
use derive_more::Display;
use http::StatusCode;
use log::error;
use crate::{AuthConfig, Database};
use crate::auth::AuthToken;
use crate::error::AuthorizationError::Unauthorized;
use crate::error::DuszaBackendError;
use crate::models::user::User;
use crate::user::UserEndpointError::UserNotFound;

pub fn configure_user_endpoints(cfg: &mut ServiceConfig) {
    cfg.service(web::scope("/user")
        .service(get_self)// Order matters, do not place this after get_user_by_id
        .service(get_user_by_id)
        .service(get_all_users)
    );
}

#[derive(Debug, Clone, Display)]
enum UserEndpointError {
    UserNotFound
}

impl ResponseError for UserEndpointError {}

#[get("/{id}")]
async fn get_user_by_id(
    db: web::Data<Database>,
    id: web::Path<(u32, )>
) -> Result<impl Responder, DuszaBackendError<UserEndpointError>> {
    let user = User::get_by_id(id.0, &db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?
        .ok_or(DuszaBackendError::Other(UserNotFound))?;

    Ok(web::Json(serde_json::to_string(&user).map_err(|e| {
        error!("{e}");
        DuszaBackendError::InternalError
    })?))
}

#[get("/")]
async fn get_all_users(
    db: web::Data<Database>,
) -> Result<impl Responder, DuszaBackendError<UserEndpointError>> {
    let users = User::get_all(&db)
        .await
        .map_err(|_| DuszaBackendError::InternalError)?;

    Ok(web::Json(serde_json::to_string(&users).map_err(|e|{
        error!("{e}");
        DuszaBackendError::InternalError
    })?))
}

#[get("/self")]
async fn get_self(
    db: web::Data<Database>,
    auth_token: AuthToken
) -> Result<impl Responder, DuszaBackendError<UserEndpointError>> {
    let user = User::from_auth_token(auth_token.token, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?
        .ok_or(DuszaBackendError::AuthError(Unauthorized))?;

    Ok(web::Json(serde_json::to_string(&user).map_err(|e|{
        error!("e: {e}");
        DuszaBackendError::InternalError
    })?))
}