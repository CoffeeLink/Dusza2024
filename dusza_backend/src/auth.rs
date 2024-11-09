// Need a FromRequest data type to handle auth

use crate::error::{AuthorizationError, DuszaBackendError, NoError};
use crate::models::auth_token::AuthTokenData;
use crate::models::user::{User, UserId, UserType};
use crate::AuthConfig;
use actix_web::cookie::time::OffsetDateTime;
use actix_web::cookie::Cookie;
use actix_web::dev::Payload;
use actix_web::http::StatusCode;
use actix_web::{post, web, FromRequest, HttpRequest, HttpResponse, Responder, ResponseError};
use derive_more::Display;
use futures::future::{err, ok, Ready};
use log::error;
use serde::{Deserialize, Serialize};
use sha2::Digest;
use sqlx::{MySql, Pool};
use std::str::FromStr;
use uuid::Uuid;
use crate::error::AuthorizationError::Unauthorized;

pub const AUTH_COOKIE_NAME: &'static str = "Authorization";

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthToken {
    pub token: Uuid,
}

impl FromRequest for AuthToken {
    type Error = AuthorizationError;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(req: &HttpRequest, payload: &mut Payload) -> Self::Future {
        match req.cookie(AUTH_COOKIE_NAME) {
            None => err(AuthorizationError::Unauthorized),
            Some(auth_token) => {
                match Uuid::from_str(auth_token.value())
                    .map_err(|_| AuthorizationError::InvalidAuthToken)
                {
                    Ok(token) => ok(AuthToken { token }),
                    Err(e) => err(e),
                }
            }
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct LoginData {
    username: String,
    password: String,
}

#[derive(Debug, Display, Copy, Clone)]
enum LoginError {
    InternalError,
    IncorrectLogin,
}

impl ResponseError for LoginError {
    fn status_code(&self) -> StatusCode {
        StatusCode::UNAUTHORIZED
    }
}

pub async fn verify_permission_level(auth_token: AuthToken, perm_level: UserType, db: &Pool<MySql>) -> Result<bool, DuszaBackendError<NoError>> {
    let user = User::from_auth_token(auth_token.token, &db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    if user.is_none() {
        return Ok(false);
    }

    if !user.unwrap().user_type.can_access(&perm_level) {
        return Ok(false)
    }
    Ok(true)
}

pub fn salt(passwd: String, auth_config: &AuthConfig) -> Vec<u8> {
    let mut hasher = sha2::Sha256::new();
    hasher.update((passwd + &auth_config.password_salt).as_bytes());
    let result = hasher.finalize();
    result.to_vec()
}

async fn validate_user(
    login: &LoginData,
    pool: &Pool<MySql>,
    auth_config: &AuthConfig,
) -> Result<UserId, DuszaBackendError<LoginError>> {
    let user_id: Option<(UserId,)> =
        sqlx::query_as("SELECT user_id FROM user WHERE username LIKE ? AND password = ?")
            .bind(login.username.clone())
            .bind(salt(login.password.clone(), auth_config))
            .fetch_optional(pool)
            .await
            .map_err(|e| {
                error!("{}", e);
                DuszaBackendError::InternalError
            })?;

    Ok(user_id
        .ok_or(DuszaBackendError::Other(LoginError::IncorrectLogin))?
        .0)
}

#[post("/login")]
pub async fn login_post(
    db: web::Data<Pool<MySql>>,
    login_data: web::Json<LoginData>,
    auth_config: web::Data<AuthConfig>,
) -> Result<impl Responder, DuszaBackendError<LoginError>> {
    let user_id = validate_user(&login_data, &db, &auth_config).await?;
    let token = AuthTokenData::create_token_for_user_by_id(user_id, &db)
        .await
        .map_err(|e| {
            error!("{}", e);
            DuszaBackendError::InternalError
        })?;

    Ok(HttpResponse::build(StatusCode::OK)
        .cookie(
            Cookie::build(AUTH_COOKIE_NAME, token.token_id.to_string())
                .expires(Some(
                    OffsetDateTime::from_unix_timestamp(token.expiry_date.timestamp()).unwrap(),
                ))
                .finish(),
        )
        .finish())
}