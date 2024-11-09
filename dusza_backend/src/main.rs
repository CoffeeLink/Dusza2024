use crate::auth::{login_post, salt};
use crate::category::configure_category_endpoints;
use crate::error::{DuszaBackendError, NoError};
use crate::languages::configure_language_endpoints;
use crate::teams::configure_team_endpoints;
use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::web::{Data, ServiceConfig};
use actix_web::{get, App, HttpServer, Responder};
use actix_web::{post, web};
use chrono::{Local, NaiveDateTime};
use log::error;
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPoolOptions;
use sqlx::{query, MySql, Pool};
use std::fs::File;
use std::io::{BufWriter, Write};
use std::process::exit;
use std::sync::Arc;

mod auth;
mod category;
mod error;
mod languages;
mod models;
mod schools;
mod teams;

#[derive(Debug, Deserialize, Serialize)]
struct DatabaseConfig {
    pub ip_address: String,
    pub port: u16,
    pub user: String,
    pub password: String,
    pub database: String,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct AuthConfig {
    pub password_salt: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Config {
    database: DatabaseConfig,
    auth: AuthConfig,
}

#[actix_web::main]
async fn main() {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    // DEBUG
    dbg!("{}", serde_json::to_string(&Local::now().naive_utc()));

    let conf = load_config();
    let pool = MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&format!(
            "mysql://{}:{}@{}/{}",
            conf.database.user,
            conf.database.password,
            conf.database.ip_address,
            conf.database.database
        ))
        .await
        .unwrap();

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .app_data(Data::new(conf.auth.clone())) // for AUTH apps
            .configure(config_dev_opts)
            .service(
                web::scope("/api")
                    .service(login_post)
                    .configure(configure_team_endpoints)
                    .configure(configure_language_endpoints)
                    .configure(configure_category_endpoints)
                    .service(web::scope("/school").service(schools::register_school_post)),
            )
            .wrap(Logger::default())
            .wrap(
                Cors::default()
                    .allow_any_header()
                    .allow_any_method()
                    .allow_any_origin()
                    .supports_credentials()
                    .max_age(3600),
            )
    })
    .bind(("127.0.0.1", 8080))
    .expect("Failed to bind on addr")
    .run()
    .await
    .expect("Something went wrong")
}

fn load_config() -> Config {
    let conf = std::fs::read_to_string("../config.toml");
    if conf.is_err() {
        eprintln!("No config file found. Generating template config in config.toml");
        let file = File::create("../config.toml").expect("Failed to create Config");
        let mut writer = BufWriter::new(file);

        let config = Config {
            auth: AuthConfig {
                password_salt: "default".to_string(),
            },
            database: DatabaseConfig {
                ip_address: "".to_string(),
                port: 0,
                user: "".to_string(),
                password: "".to_string(),
                database: "".to_string(),
            },
        };

        writer
            .write(
                toml::to_string_pretty(&config)
                    .expect("Failed parsing default config")
                    .as_bytes(),
            )
            .expect("Failed write");
        writer.flush().expect("Failed flush");
        exit(1);
    }

    let contents = conf.unwrap();
    let config: Config = toml::from_str(&contents).unwrap();
    config
}

fn config_dev_opts(cfg: &mut ServiceConfig) {
    #[cfg(not(release))]
    cfg.service(gen_user);
}

#[post("/dev/register/{user}/{pass}")]
async fn gen_user(
    db: web::Data<Pool<MySql>>,
    path: web::Path<(String, String)>,
    auth_config: web::Data<AuthConfig>,
) -> Result<impl Responder, DuszaBackendError<NoError>> {
    let (username, passwd) = path.into_inner();
    let _ = query("INSERT INTO user (username, password, user_type) VALUES (?, ?, 3)") // user type 3 is ORGANIZER
        .bind(username)
        .bind(salt(passwd, &auth_config))
        .execute(&**db)
        .await
        .map_err(|e| {
            error!("{e}");
            DuszaBackendError::InternalError
        })?;

    Ok(web::Json("Success!"))
}
