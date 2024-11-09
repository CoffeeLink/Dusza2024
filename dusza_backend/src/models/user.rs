use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlTypeInfo;
use sqlx::{Decode, Encode, FromRow, MySql, Type};
use uuid::Uuid;
use crate::models::user::UserType::{SchoolRepresentative, TeamAccount};

pub type UserId = u32;
#[derive(Debug, Type, Clone, Ord, PartialOrd, Eq, PartialEq, Copy, Serialize, Deserialize)]
#[repr(u8)]
pub enum UserType { // id-s set manually cuz it was an ENUM originally and MYSQL starts with 1. instead of 0
    TeamAccount = 1,
    SchoolRepresentative = 2,
    Organizer = 3,
}


impl UserType {
    pub fn can_access(&self, level_needed: &Self) -> bool {
        match self {
            UserType::TeamAccount => { self == level_needed }
            UserType::SchoolRepresentative => { level_needed == &TeamAccount || level_needed == &SchoolRepresentative }
            UserType::Organizer => { true } // root
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
}

//pub async fn create_org_user(username: )
