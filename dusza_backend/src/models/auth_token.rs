use crate::models::user::UserId;
use chrono::{DateTime, Duration, Local, NaiveDate, NaiveDateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{query_as, FromRow, MySql, Pool};
use uuid::Uuid;
#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct AuthTokenData {
    pub token_id: Uuid,
    pub user_id: u32,
    pub expiry_date: NaiveDateTime,
    pub creation_date: NaiveDateTime,
}

impl AuthTokenData {
    pub async fn get_token_data_by_token_id(
        token_id: Uuid,
        db: &Pool<MySql>,
    ) -> Result<Option<AuthTokenData>, sqlx::Error> {
        let token: Option<AuthTokenData> = query_as("SELECT token_id, user_id, expiry_date, creation_date FROM auth_tokens WHERE token_id = ?")
            .bind(&token_id.as_bytes()[..])
            .fetch_optional(db)
            .await?;

        Ok(token)
    }

    pub async fn create_token_for_user_by_id(
        user_id: UserId,
        db: &Pool<MySql>,
    ) -> Result<AuthTokenData, sqlx::Error> {
        let token = AuthTokenData {
            token_id: Uuid::now_v7(),
            user_id,
            expiry_date: Local::now().naive_local() + Duration::days(2),
            creation_date: Local::now().naive_local(),
        };
        let _ = sqlx::query("INSERT INTO auth_tokens(token_id, user_id, expiry_date, creation_date) VALUES (?, ?, ?, ?)")
            .bind(token.token_id)
            .bind(token.user_id)
            .bind(token.expiry_date)
            .bind(token.creation_date)
            .execute(db)
            .await?;

        Ok(token)
    }
}
