use crate::error::{DuszaBackendError, NoError};
use crate::models::DBError;
use crate::Database;
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, Error, FromRow, Row};
use sqlx::mysql::MySqlRow;
use crate::models::user::{User, UserId, UserType};

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct SchoolData {
    pub school_id: u32,
    pub school_name: String,
    pub school_address: String,
    pub school_rep_name: String,
    pub school_rep_email: String,

    pub user: User
}

impl<'r> FromRow<'r, MySqlRow> for SchoolData {
    fn from_row(row: &'r MySqlRow) -> Result<Self, Error> {
        let school_id : u32 = row.try_get("school_id")?;
        let school_name: String = row.try_get("school_name")?;
        let school_address: String = row.try_get("school_address")?;
        let school_rep_name: String = row.try_get("school_rep_name")?;
        let school_rep_email: String = row.try_get("school_rep_email")?;

        let user_id: UserId = row.try_get("user_id")?;
        let username: String = row.try_get("username")?;
        let user_type: UserType = row.try_get("user_type")?;

        Ok(Self {
            school_id,
            school_name,
            school_address,
            school_rep_name,
            school_rep_email,
            user: User {
                user_id,
                username,
                user_type,
            },
        })
    }
}

impl SchoolData {
    pub async fn get_school_by_id(
        id: u32,
        db: &Database,
    ) -> Result<Option<SchoolData>, DuszaBackendError<DBError>> {
        let sql = r#"
SELECT
    s.school_id,
    s.school_name,
    s.school_address,
    s.school_representative_name as 'school_rep_name',
    s.school_representative_email as 'school_rep_name',

    u.user_id,
    u.username,
    u.user_type
FROM
    school_data s
JOIN user u
    ON u.school_id = s.school_id
WHERE
    s.school_id = ?
        "#;
        let school: Option<SchoolData> = query_as(sql)
        .bind(id)
        .fetch_optional(db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

        Ok(school)
    }

    pub async fn get_all_schools(
        db: &Database,
    ) -> Result<Vec<SchoolData>, DuszaBackendError<DBError>> {
        let sql = r#"
SELECT
    s.school_id,
    s.school_name,
    s.school_address,
    s.school_representative_name as 'school_rep_name',
    s.school_representative_email as 'school_rep_name',

    u.user_id,
    u.username,
    u.user_type
FROM
    school_data s
JOIN user u ON
        u.school_id = s.school_id;
        "#;
        let schools: Vec<SchoolData> = query_as(sql)
            .fetch_all(db)
            .await
            .map_err(|e| {
                error!("{e}");
                DuszaBackendError::InternalError
            })?;

        Ok(schools)
    }

    // Only edits the School information, user info is intact
    pub async fn edit_school(new_name: impl Into<String>,
                             new_address: impl Into<String>,
                             new_rep_name: impl Into<String>,
                             new_rep_email: impl Into<String>,
                             db: &Database) -> Result<(), DuszaBackendError<DBError>> {
        let sql = r#"
UPDATE
    school_data
SET
    school_name = ?,
    school_address = ?,
    school_representative_name = ?,
    school_representative_email = ?
WHERE
    school_id = ?
        "#;

        let _ = query(sql)
            .bind(new_name.into())
            .bind(new_address.into())
            .bind(new_rep_name.into())
            .bind(new_rep_email.into())
            .execute(db)
            .await
            .map_err(|e|{
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?;

        Ok(())
    }


    pub async fn delete_school_by_id(id: u32, db: &Database) -> Result<(), DuszaBackendError<DBError>> {
        let sql = r#"
DELETE FROM school_data
WHERE school_id = ?;
        "#;
        let _ = query(sql)
            .bind(id)
            .execute(db)
            .await
            .map_err(|e|{
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?;

        Ok(())
    }

    pub async fn create_school_account_and_assign(
        user: User,
        school_name: impl Into<String>,
        school_address: impl Into<String>,
        school_rep_name: impl Into<String>,
        school_rep_email: impl Into<String>,
        db: &Database
    ) -> Result<SchoolData, DuszaBackendError<DBError>> {
        let sql = r#"
INSERT INTO school_data (school_name, school_address, school_representative_name, school_representative_email)
VALUE (?, ?, ?, ?)
        "#;

        let school_name = school_name.into();
        let school_address = school_address.into();
        let school_rep_name = school_rep_name.into();
        let school_rep_email = school_rep_email.into();

        let school_id: u32 = query(sql)
            .bind(school_name.clone())
            .bind(school_address.clone())
            .bind(school_rep_name.clone())
            .bind(school_rep_email.clone())
            .execute(db)
            .await
            .map_err(|e|{
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?
            .last_insert_id() as u32;

        // assign to user
        let sql = r#"
UPDATE user
SET school_id = ?
WHERE user_id = ?
        "#;
        let _ = query(sql)
            .bind(school_id)
            .bind(user.user_id)
            .execute(db)
            .await
            .map_err(|e|{
                error!("MYSQL EXEC ERROR: {e}");
                DuszaBackendError::InternalError
            })?;

        Ok(SchoolData {
            school_id,
            school_name,
            school_address,
            school_rep_name,
            school_rep_email,
            user,
        })
    }
}
