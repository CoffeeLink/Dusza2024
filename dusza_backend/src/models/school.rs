use crate::error::{DuszaBackendError, NoError};
use crate::models::DBError;
use crate::Database;
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{query_as, FromRow};

#[derive(Debug, Deserialize, Serialize, FromRow, Clone)]
pub struct SchoolData {
    pub school_id: u32,
    pub school_name: String,
    pub school_address: String,
    pub school_rep_name: String,
    pub school_rep_email: String,
}

impl SchoolData {
    pub async fn get_school_by_id(
        id: u32,
        db: &Database,
    ) -> Result<Option<SchoolData>, DuszaBackendError<DBError>> {
        let sql = r#"
        SELECT
            school_id,
            school_name,
            school_address,
            school_representative_name as 'school_rep_name',
            school_representative_email as 'school_rep_name'
        FROM
            school
        WHERE
            school_id = ?
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
            school_id,
            school_name,
            school_address,
            school_representative_name as 'school_rep_name',
            school_representative_email as 'school_rep_name'
        FROM
            school
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

    

}
