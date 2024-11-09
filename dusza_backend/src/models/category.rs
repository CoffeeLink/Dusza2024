use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, FromRow, MySql, Pool, Type};

#[derive(Debug, Type, Clone, Ord, PartialOrd, Eq, PartialEq, Copy, Serialize, Deserialize)]
#[sqlx(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum CategoryState {
    Open,
    Closed,
    Begun,
    Ended,
    Results
}

#[derive(Debug, Deserialize, Serialize, FromRow, Clone)]
pub struct CompetitionCategory {
    category_id: u32,
    category_name: String,
    category_description: Option<String>,
    category_deadline: NaiveDateTime,
    category_application_state: CategoryState
}

impl CompetitionCategory {
    pub async fn get_comp_by_id(
        id: u32,
        db: &Pool<MySql>,
    ) -> Result<Option<CompetitionCategory>, sqlx::Error> {
        let lang: Option<CompetitionCategory> =
            query_as("SELECT category_id, category_name, category_description, category_deadline, category_application_state FROM competition_category WHERE category_id = ?")
                .bind(id)
                .fetch_optional(db)
                .await?;
        Ok(lang)
    }

    pub async fn get_all(db: &Pool<MySql>) -> Result<Vec<CompetitionCategory>, sqlx::Error> {
        let langs: Vec<CompetitionCategory> =
            query_as("SELECT category_id, category_name, category_description, category_deadline, category_application_state FROM competition_category")
                .fetch_all(db)
                .await?;
        Ok(langs)
    }

    pub async fn edit_comp_by_id(
        category_id: u32,
        new_name: String,
        new_description: Option<String>,
        new_deadline: NaiveDateTime,
        new_state: CategoryState,
        db: &Pool<MySql>,
    ) -> Result<CompetitionCategory, sqlx::Error> {
        let _ = query("UPDATE competition_category SET category_name = ?, category_description = ?, category_deadline = ?, category_state = ? WHERE category_id = ?")
            .bind(new_name.clone())
            .bind(new_description.clone())
            .bind(new_deadline.clone())
            .bind(new_state.clone())
            .bind(category_id)
            .execute(db)
            .await?;

        Ok(
            Self {
            category_id,
            category_name: new_name,
            category_description: new_description,
            category_deadline: new_deadline,
            category_application_state: new_state
        })
    }

    pub async fn delete_comp_by_id(category_id: u32, db: &Pool<MySql>) -> Result<(), sqlx::Error> {
        let _ = query("DELETE FROM competition_category WHERE category_id = ?")
            .bind(category_id)
            .execute(db)
            .await?;
        Ok(())
    }

    pub async fn create_lang(
        category_name: String,
        category_desc: Option<String>,
        category_deadline: NaiveDateTime,
        category_state: CategoryState,
        db: &Pool<MySql>,
    ) -> Result<CompetitionCategory, sqlx::Error> {
        let id = query("INSERT INTO competition_category(category_name, category_description, category_deadline, category_application_state) VALUES (?)")
            .bind(category_name.clone())
            .bind(category_desc.clone())
            .bind(category_deadline.clone())
            .bind(category_state.clone())
            .execute(db)
            .await?
            .last_insert_id() as u32;

        Ok(CompetitionCategory {
            category_id: id,
            category_name,
            category_description: category_desc,
            category_deadline,
            category_application_state: category_state
        })
    }
}
