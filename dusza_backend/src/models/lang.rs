use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, FromRow, MySql, Pool};

#[derive(Debug, Deserialize, Serialize, FromRow, Clone)]
pub struct ProgrammingLanguage {
    lang_id: u32,
    lang_name: String,
}

impl ProgrammingLanguage {
    pub async fn get_lang_by_id(
        id: u32,
        db: &Pool<MySql>,
    ) -> Result<Option<ProgrammingLanguage>, sqlx::Error> {
        let lang: Option<ProgrammingLanguage> =
            query_as("SELECT lang_id, lang_name FROM programming_language WHERE lang_id = ?")
                .bind(id)
                .fetch_optional(db)
                .await?;
        Ok(lang)
    }

    pub async fn get_all(db: &Pool<MySql>) -> Result<Vec<ProgrammingLanguage>, sqlx::Error> {
        let langs: Vec<ProgrammingLanguage> =
            query_as("SELECT lang_id, lang_name FROM programming_language")
                .fetch_all(db)
                .await?;
        Ok(langs)
    }

    pub async fn edit_lang_by_id(
        lang_id: u32,
        new_name: String,
        db: &Pool<MySql>,
    ) -> Result<ProgrammingLanguage, sqlx::Error> {
        let _ = query("UPDATE programming_language SET lang_name = ? WHERE lang_id = ?")
            .bind(new_name.clone())
            .bind(lang_id)
            .execute(db)
            .await?;

        Ok(ProgrammingLanguage {
            lang_name: new_name,
            lang_id,
        })
    }

    pub async fn delete_lang_by_id(lang_id: u32, db: &Pool<MySql>) -> Result<(), sqlx::Error> {
        let _ = query("DELETE FROM programming_language WHERE lang_id = ?")
            .bind(lang_id)
            .execute(db)
            .await?;
        Ok(())
    }

    pub async fn create_lang(
        lang_name: String,
        db: &Pool<MySql>,
    ) -> Result<ProgrammingLanguage, sqlx::Error> {
        let id = query("INSERT INTO programming_language(lang_name) VALUES (?)")
            .bind(lang_name.clone())
            .execute(db)
            .await?
            .last_insert_id() as u32;

        Ok(ProgrammingLanguage {
            lang_id: id,
            lang_name,
        })
    }
}
