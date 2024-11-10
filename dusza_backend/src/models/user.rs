use log::error;
use crate::models::user::UserType::{SchoolRepresentative, TeamAccount};
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, Decode, Encode, FromRow, MySql, Type};
use uuid::Uuid;
use crate::{AuthConfig, Database};
use crate::auth::salt;
use crate::error::DuszaBackendError;
use crate::models::DBError;

pub type UserId = u32;
#[derive(Debug, Type, Clone, Ord, PartialOrd, Eq, PartialEq, Copy, Serialize, Deserialize)]
#[repr(u8)]
pub enum UserType {
    // id-s set manually cuz it was an ENUM originally and MYSQL starts with 1. instead of 0
    TeamAccount = 1,
    SchoolRepresentative = 2,
    Organizer = 3,
}

impl UserType {
    pub fn can_access(&self, level_needed: &Self) -> bool {
        match self {
            UserType::TeamAccount => self == level_needed,
            UserType::SchoolRepresentative => {
                level_needed == &TeamAccount || level_needed == &SchoolRepresentative
            }
            UserType::Organizer => true, // root
        }
    }
}
#[derive(Debug, FromRow, Clone, Serialize, Deserialize)]
pub struct User {
    pub user_id: UserId,
    pub username: String,
    pub user_type: UserType,
}

impl User {
    pub async fn from_auth_token(
        auth_token: Uuid,
        pool: &sqlx::Pool<MySql>,
    ) -> sqlx::Result<Option<User>> {
        let user: Option<User> = sqlx::query_as("SELECT u.user_id, u.username, u.user_type FROM user u JOIN auth_tokens a ON u.user_id = a.user_id WHERE a.token_id = ?")
            .bind(&auth_token.as_bytes()[..])
            .fetch_optional(pool)
            .await?;

        Ok(user)
    }

    pub async fn get_by_id(id: u32, db: &Database) -> Result<Option<User>, DuszaBackendError<DBError>> {
        let sql = r#"
        SELECT
            u.user_id,
            u.username,
            u.user_type
        FROM
            user u
        WHERE
            u.user_id = ?
        "#;
        let user: Option<User> = query_as(sql)
            .bind(id)
            .fetch_optional(db)
            .await
            .map_err(|e| {
                error!("{e}");
                DuszaBackendError::InternalError
            })?;

        Ok(user)
    }

    pub async fn get_all(db: &Database) -> Result<Vec<User>, DuszaBackendError<DBError>> {
        let sql = r#"
        SELECT
            u.user_id,
            u.username,
            u.user_type
        FROM
            user u
        "#;
        let user: Vec<User> = query_as(sql)
            .fetch_all(db)
            .await
            .map_err(|e| {
                error!("{e}");
                DuszaBackendError::InternalError
            })?;

        Ok(user)
    }

    pub async fn create_user(
        username: impl Into<String>,
        password: impl Into<String>,
        user_type: UserType,
        db: &Database,
        auth_config: &AuthConfig
    ) -> Result<User, DuszaBackendError<DBError>> {
        let salted_password = salt(password.into(), auth_config);
        let sql = r#"
INSERT INTO user (username, password, user_type)
VALUE (?, ?, ?)
        "#;
        let usr_name = username.into();
        let user_id: UserId = query(sql)
            .bind(usr_name.clone())
            .bind(salted_password)
            .bind(user_type.clone())
            .execute(db)
            .await
            .map_err(|e| {
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?
            .last_insert_id() as u32;

        Ok(User{
            user_id,
            username: usr_name,
            user_type
        })
    }

    pub async fn change_user_password(
        user_id: UserId,
        new_password: impl Into<String>,
        db: &Database,
        auth_config: &AuthConfig
    ) -> Result<(), DuszaBackendError<DBError>> {
        let sql = r#"
UPDATE user
SET password = ?
WHERE user_id = ?
        "#;
        let new_password = salt(new_password.into(), auth_config);
        let _ = query(sql)
            .bind(new_password)
            .bind(user_id)
            .execute(db)
            .await
            .map_err(|e| {
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?;

        Ok(())
    }
}

//pub async fn create_org_user(username: )
