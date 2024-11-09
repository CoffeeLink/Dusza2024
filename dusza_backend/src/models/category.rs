use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, FromRow, MySql, Pool};

#[derive(Debug, Deserialize, Serialize, FromRow, Clone)]
pub struct CompetitionCategory {
    category_id: u32,
    category_name: String,
}

impl CompetitionCategory {
    pub async fn get_comp_by_id(
        id: u32,
        db: &Pool<MySql>,
    ) -> Result<Option<CompetitionCategory>, sqlx::Error> {
        let lang: Option<CompetitionCategory> =
            query_as("SELECT category_id, category_name FROM competition_category WHERE category_id = ?")
                .bind(id)
                .fetch_optional(db)
                .await?;
        Ok(lang)
    }

    pub async fn get_all(db: &Pool<MySql>) -> Result<Vec<CompetitionCategory>, sqlx::Error> {
        let langs: Vec<CompetitionCategory> =
            query_as("SELECT category_id, category_name FROM competition_category")
                .fetch_all(db)
                .await?;
        Ok(langs)
    }

    pub async fn edit_comp_by_id(
        category_id: u32,
        new_name: String,
        db: &Pool<MySql>,
    ) -> Result<CompetitionCategory, sqlx::Error> {
        let _ = query("UPDATE competition_category SET category_name = ? WHERE category_id = ?")
            .bind(new_name.clone())
            .bind(category_id)
            .execute(db)
            .await?;

        Ok(CompetitionCategory {
            category_name: new_name,
            category_id,
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
        db: &Pool<MySql>,
    ) -> Result<CompetitionCategory, sqlx::Error> {
        let id = query("INSERT INTO competition_category(category_name) VALUES (?)")
            .bind(category_name.clone())
            .execute(db)
            .await?
            .last_insert_id() as u32;

        Ok(CompetitionCategory {
            category_id: id,
            category_name,
        })
    }
}
