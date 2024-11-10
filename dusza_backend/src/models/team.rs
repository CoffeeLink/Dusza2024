use std::mem::take;
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::{query, query_as, Error, FromRow, MySql, Row, Type};
use sqlx::mysql::MySqlRow;
use crate::Database;
use crate::error::{DuszaBackendError, NoError};
use crate::models::category::CompetitionCategory;
use crate::models::DBError;
use crate::models::lang::ProgrammingLanguage;
use crate::models::school::SchoolData;
use crate::models::user::{User, UserType};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct TeamMember {
    pub member_name: String,
    pub member_class: String,
}

impl TeamMember {
    pub fn new(name: impl Into<String>, class: impl Into<String>) -> Self {
        Self {
            member_name: name.into(),
            member_class: class.into()
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize, FromRow)]
pub struct SherpaTeacher {
    pub teacher_id: u32,
    pub group_id: u32, // team
    pub teacher_name: String,
}

impl SherpaTeacher {
    pub async fn get_teachers_by_group_id(group_id: u32, db: &Database) -> Result<Vec<Self>, DuszaBackendError<DBError>> {
        let sql = r#"
SELECT
    teacher_id,
    group_id,
    teacher_name
FROM
    sherpa_teacher
WHERE
    group_id = ?
        "#;

        let teachers: Vec<SherpaTeacher> = query_as(sql)
            .bind(group_id)
            .fetch_all(db)
            .await
            .map_err(|e|{
                error!("{e}");
                DuszaBackendError::InternalError
            })?;

        Ok(teachers)
    }

    pub async fn delete_all_by_group(group_id: u32, db: &Database) -> Result<(), DuszaBackendError<NoError>> {
        let sql = r#"
DELETE FROM sherpa_teacher
WHERE group_id = ?
        "#;
        let _ = query(sql)
            .bind(group_id)
            .execute(db)
            .await
            .map_err(|e| {
                error!("{e}");
                DuszaBackendError::InternalError
            })?;
        Ok(())
    }

    pub async fn add_teachers_to_group(group_id: u32, teachers: Vec<String>, db: &Database) -> Result<(), DuszaBackendError<NoError>> {
        let sql = r#"
INSERT INTO sherpa_teacher (group_id, teacher_name)
VALUE (?, ?)
        "#;
        for teacher in teachers {
            let _ = query(sql)
                .bind(group_id)
                .bind(teacher)
                .execute(db)
                .await
                .map_err(|e| {
                    error!("{e}");
                    DuszaBackendError::InternalError
                })?;
        }

        Ok(())
    }
}


#[derive(Debug, Type, Clone, Ord, PartialOrd, Eq, PartialEq, Copy, Serialize, Deserialize)]
#[repr(u8)]
pub enum TeamApprovalState {
    WaitingForApproval = 0,
    ApprovedBySchoolRep = 1,
    ApprovedByOrganizer = 2,
    Approved = 3 // mind2 party Approve-olt
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TeamData {
    pub team_id: u32,
    pub team_name: String,
    pub school: SchoolData,
    pub members: [TeamMember; 3],
    pub replacement_member: Option<TeamMember>,
    pub category: CompetitionCategory,
    pub lang: ProgrammingLanguage,
    pub sherpa_teachers: Vec<SherpaTeacher>,
    pub team_approval_state: TeamApprovalState,
    pub disapproval_message: Option<String>,

    pub user: User
}



impl TeamData {
    pub async fn get_all_teams(db: &Database) -> Result<Vec<TeamData>, DuszaBackendError<NoError>> {
        let sql = r#"
SELECT
    t.team_id,
    t.team_name,
    t.member_name_1,
    t.member_name_2,
    t.member_name_3,
    t.member_class_1,
    t.member_class_2,
    t.member_class_3,
    t.replacement_member_name,
    t.replacement_member_class,
    t.approval_state,
    t.dissapproval_msg,

    t.school_id,
    t.programming_language_id,
    t.category_id,

    u.user_id,
    u.username

FROM team_data t
JOIN user u ON t.team_id = u.team_data_id
        "#;
        let team_info = query(sql)
            .fetch_all(db)
            .await
            .map_err(|e| {
                error!("{e}");
                DuszaBackendError::InternalError
            })?;
        let mut teams = Vec::new();
        for result in team_info {
            let school_id: u32 = result.try_get("school_id").unwrap();
            let programming_language_id: u32 = result.try_get("programming_language_id").unwrap();
            let category_id: u32 = result.try_get("category_id").unwrap();
            let team_id: u32 = result.try_get("team_id").unwrap();

            let school = SchoolData::get_school_by_id(school_id, db).await.unwrap().unwrap();
            let lang = ProgrammingLanguage::get_lang_by_id(programming_language_id, db).await.unwrap().unwrap();
            let category = CompetitionCategory::get_comp_by_id(category_id, db).await.unwrap().unwrap();
            let teachers = SherpaTeacher::get_teachers_by_group_id(team_id, db).await.unwrap();

            let members: [TeamMember; 3] = [
                TeamMember::new(
                    result.try_get::<String, &str>("member_name_1").unwrap(),
                    result.try_get::<String, &str>("member_class_1").unwrap()
                ),
                TeamMember::new(
                    result.try_get::<String, &str>("member_name_2").unwrap(),
                    result.try_get::<String, &str>("member_class_2").unwrap()
                ),
                TeamMember::new(
                    result.try_get::<String, &str>("member_name_2").unwrap(),
                    result.try_get::<String, &str>("member_class_2").unwrap()
                ),
            ];

            let mut replacement: Option<TeamMember> = None;
            if result.try_get::<String, &str>("replacement_member_name").is_ok() {
                replacement = Some(TeamMember::new(
                    result.try_get::<String, &str>("replacement_member_name").unwrap(),
                    result.try_get::<String, &str>("replacement_member_class").unwrap()
                ));
            }

            let team = Self {
                team_id,
                team_name: result.try_get("team_name").unwrap(),
                school,
                members,
                replacement_member: replacement,
                category,
                lang,
                sherpa_teachers: teachers,
                team_approval_state: result.try_get("approval_state").unwrap(),
                disapproval_message: result.try_get("dissapproval_msg").ok(),
                user: User {
                    user_id: result.try_get("user_id").unwrap(),
                    username: result.try_get("username").unwrap(),
                    user_type: UserType::TeamAccount,
                }
            };

            teams.push(team)
        }

        Ok(teams)
    }

    pub async fn get_team_by_id(team_id: u32, db: &Database) -> Result<Option<TeamData>, DuszaBackendError<NoError>> {
        let mut teams = Self::get_all_teams(db).await?;
        let team = teams.drain(..).find(|t| t.team_id == team_id);

        Ok(team)
    }

    pub async fn create_and_assign_team(
        db: &Database,
        user: User,
        team_name: impl Into<String>,
        school: SchoolData,
        members: [TeamMember; 3],
        replacement_member: Option<TeamMember>,
        category: CompetitionCategory,
        lang: ProgrammingLanguage,
        sherpa_teachers: Vec<String>,
        team_approval_state: TeamApprovalState,
        disapproval_message: Option<String>
    ) -> Result<TeamData, DuszaBackendError<NoError>> {
        let sql = r#"
INSERT INTO team_data (team_name,
                       school_id,
                       member_name_1,
                       member_name_2,
                       member_name_3,
                       member_class_1,
                       member_class_2,
                       member_class_3,
                       replacement_member_name,
                       replacement_member_class,
                       category_id,
                       programming_language_id,
                       approval_state,
                       dissapproval_msg
) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        "#;
        let team_name = team_name.into();

        let team_id: u32 = query(sql)
            .bind(team_name.clone())
            .bind(school.school_id)
            .bind(members[0].member_name.clone())
            .bind(members[1].member_name.clone())
            .bind(members[2].member_name.clone())
            .bind(members[0].member_class.clone())
            .bind(members[1].member_class.clone())
            .bind(members[2].member_class.clone())
            .bind({
                if replacement_member.is_none() {None} else { Some(replacement_member.clone().unwrap().member_name) }
            })
            .bind({
                if replacement_member.is_none() {None} else { Some(replacement_member.clone().unwrap().member_class) }
            })
            .bind(category.category_id)
            .bind(lang.lang_id)
            .bind(team_approval_state.clone())
            .bind(disapproval_message.clone())
            .execute(db)
            .await
            .map_err(|e|{
                error!("{e}");
                DuszaBackendError::InternalError
            })?
            .last_insert_id() as u32;

        SherpaTeacher::add_teachers_to_group(team_id, sherpa_teachers, &db)
            .await.map_err(|_| DuszaBackendError::InternalError)?;

        let sql = r#"
UPDATE user
SET team_data_id = ?
WHERE user_id = ?
        "#;

        let _ = query(sql).bind(team_id).bind(user.user_id).execute(*&db).await.map_err(|_| DuszaBackendError::InternalError)?;

        Ok(Self::get_team_by_id(team_id, db).await?.unwrap())
    }

    pub async fn delete_team_by_id(
        db: &Database,
        team_id: u32
    ) -> Result<(), DuszaBackendError<NoError>> {
        let sql = r#"
DELETE FROM team_data
WHERE team_id = ?
        "#;
        let _ = query(sql)
            .bind(team_id)
            .execute(db)
            .await
            .map_err(|e|{
                error!("{e}");
                DuszaBackendError::InternalError
            })?;

        Ok(())
    }

    pub async fn update_team_by_id(
        team_id: u32,
        db: &Database,
        new_name: impl Into<String>,
        members: [TeamMember; 3],
        new_replacement: Option<TeamMember>,
        new_lang_id: u32
    ) -> Result<(), DuszaBackendError<NoError>> {
        let sql = r#"
UPDATE team_data
SET
    team_name = ?,
    member_name_1 = ?,
    member_name_2 = ?,
    member_name_3 = ?,
    member_class_1 = ?,
    member_class_2 = ?,
    member_class_3 = ?,
    replacement_member_name = ?,
    replacement_member_class = ?,
    programming_language_id = ?
WHERE team_id = ?
        "#;
        let _ = query(sql)
            .bind(new_name.into())
            .bind(members[0].member_name.clone())
            .bind(members[1].member_name.clone())
            .bind(members[2].member_name.clone())
            .bind(members[0].member_class.clone())
            .bind(members[1].member_class.clone())
            .bind(members[2].member_class.clone())
            .bind({
                if new_replacement.is_none() {None} else { Some(new_replacement.clone().unwrap().member_name) }
            })
            .bind({
                if new_replacement.is_none() {None} else { Some(new_replacement.clone().unwrap().member_class) }
            })
            .bind(new_lang_id)
            .bind(team_id)
            .execute(db)
            .await
            .map_err(|e|{
                error!("{e}");
                DuszaBackendError::InternalError
            })?;
        Ok(())
    }
}