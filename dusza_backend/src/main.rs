use crate::auth::login_post;
use crate::languages::configure_language_endpoints;
use crate::teams::configure_team_endpoints;
use actix_web::middleware::Logger;
use actix_web::web;
use actix_web::web::Data;
use actix_web::{get, App, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPoolOptions;
use std::fs::File;
use std::io::{BufWriter, Write};
use std::process::exit;
use std::sync::Arc;
use crate::category::configure_category_endpoints;

mod auth;
mod error;
mod languages;
mod models;
mod schools;
mod teams;
mod category;

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

    let conf = load_config();

    dbg!(&conf); // TODO: rm this

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
            .service(login_post)
            .service(
                web::scope("/api")
                    .configure(configure_team_endpoints)
                    .configure(configure_language_endpoints)
                    .configure(configure_category_endpoints)
                    .service(web::scope("/school").service(schools::register_school_post)),
            )
            .wrap(Logger::default())
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
