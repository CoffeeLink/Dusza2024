use crate::auth::AuthToken;
use crate::auth::AUTH_COOKIE_NAME;
use crate::models::user::User;
use crate::schools::SchoolRegistrationError::NotAuthorized;
use actix_web::body::BoxBody;
use actix_web::cookie::Cookie;
use actix_web::http::{header, StatusCode};
use actix_web::web::{BytesMut, Data};
use actix_web::{
    post, web, HttpRequest, HttpResponse, HttpResponseBuilder, Responder, ResponseError,
};
use derive_more::Display;
use serde::{Deserialize, Serialize};
use sqlx::{MySql, Pool};
use std::fmt::format;
use std::str::FromStr;
use uuid::{Error, Uuid};

#[derive(Clone, Deserialize, Debug, Serialize)]
struct SchoolData {
    school_name: String,
}

#[derive(Display, Debug, Ord, PartialOrd, Eq, PartialEq)]
enum SchoolRegistrationError {
    NotAuthorized,
    InvalidAuthToken,
    InternalError,
}

impl ResponseError for SchoolRegistrationError {
    fn status_code(&self) -> StatusCode {
        match self {
            NotAuthorized => StatusCode::UNAUTHORIZED,
            SchoolRegistrationError::InvalidAuthToken => StatusCode::UNAUTHORIZED,
            SchoolRegistrationError::InternalError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        let mut rb = HttpResponse::build(self.status_code());
        if *self == SchoolRegistrationError::InvalidAuthToken {
            let mut rm_auth = Cookie::new(AUTH_COOKIE_NAME, "");
            rm_auth.make_removal();
            rb.cookie(rm_auth);
        }

        rb.body(format!("{}", self))
    }
}

#[post("/register")]
pub async fn register_school_post(
    auth_token: AuthToken,
    school_data: web::Json<SchoolData>,
    db_pool: Data<Pool<MySql>>,
) -> Result<impl Responder, SchoolRegistrationError> {
    let user = User::from_auth_token(auth_token.token, &db_pool)
        .await
        .map_err(|_| SchoolRegistrationError::InternalError)?
        .ok_or(SchoolRegistrationError::NotAuthorized)?;

    Ok(web::Json(serde_json::to_string_pretty(&user).unwrap()))
}
