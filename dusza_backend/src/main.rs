use crate::auth::{login_post, logout_post, salt};
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
use crate::schools::configure_school_endpoints;
use crate::user::configure_user_endpoints;

mod auth;
mod category;
mod error;
mod languages;
mod models;
mod schools;
mod teams;
mod user;

pub type Database = Pool<MySql>;

#[derive(Debug, Deserialize, Serialize)]
struct DatabaseConfig {
    pub ip_address: String,
    pub port: u16,
    pub user: String,
    pub password: String,
    pub database: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct HostConfig {
    pub ip_address: String,
    pub port: u16,
}
#[derive(Debug, Deserialize, Serialize)]
struct DebugConfig {
    pub enable_registration_endpoint: bool,
    pub logging_level: String,
    pub backtrace: bool,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
struct AuthConfig {
    pub password_salt: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Config {
    host: HostConfig,
    database: DatabaseConfig,
    auth: AuthConfig,
    debug: DebugConfig
}

#[actix_web::main]
async fn main() {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "0");
    env_logger::init();


    let conf = load_config();
    std::env::set_var("RUST_LOG", conf.debug.logging_level);
    std::env::set_var("RUST_BACKTRACE", format!("{}", conf.debug.backtrace as u8));
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
        .map_err(|e| {
            error!("failed to connect to MYSQL server: {e}");
            exit(-1);
        }).expect("Fail");

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .app_data(Data::new(conf.auth.clone())) // for AUTH apps
            .configure(config_dev_opts)
            .service(
                web::scope("/api")
                    .service(login_post)
                    .service(logout_post)
                    .configure(configure_team_endpoints)
                    .configure(configure_language_endpoints)
                    .configure(configure_category_endpoints)
                    .configure(configure_user_endpoints)
                    .configure(configure_school_endpoints)
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
    .bind((conf.host.ip_address, conf.host.port))
    .map_err(|e| {
        error!("Failed to bind: {e}");
        exit(-1);
    }).expect("failed to bind")
    .run()
    .await
        .map_err(|e| {
            error!("Something went wrong: {e}");
            exit(-1);
        }).expect("failed to exit")
}

fn load_config() -> Config {
    let conf = std::fs::read_to_string("../config.toml");
    if conf.is_err() {
        error!("No config file found. Generating template config in config.toml");
        let file = File::create("../config.toml").expect("Failed to create Config");
        let mut writer = BufWriter::new(file);

        let config = Config {
            host: HostConfig {
                ip_address: "127.0.0.1".to_string(),
                port: 8000,
            },
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
            debug: DebugConfig {
                enable_registration_endpoint: false,
                logging_level: "debug".to_string(),
                backtrace: false,
            }
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
    db: web::Data<Database>,
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
            DuszaBackendError::<NoError>::InternalError
        })?;

    Ok(web::Json("Success!"))
}
