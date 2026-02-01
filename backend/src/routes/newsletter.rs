use axum::{
    extract::{Extension, Json},
    routing::post,
    Router,
    response::IntoResponse,
    http::{StatusCode, HeaderMap},
};
use std::sync::Arc;
use serde::Deserialize;
use jsonwebtoken::{DecodingKey, Validation, decode};
use sqlx::Row;
use crate::state::AppState;
use crate::email::{send_email, send_html_email};

#[derive(Deserialize)]
pub struct SubscribeRequest {
    email: String,
}

fn default_true() -> bool { true }

#[derive(Deserialize)]
pub struct SendNewsletterRequest {
    subject: String,
    #[serde(alias = "body_html")]
    content: String,
    #[serde(default = "default_true")]
    is_html: bool,
}

#[derive(Deserialize)]
#[allow(dead_code)]
struct Claims { sub: String, email: String, exp: usize }

pub fn router() -> Router {
    Router::new()
        .route("/api/newsletter/subscribe", post(subscribe))
        .route("/api/admin/newsletter/send", post(send_newsletter))
}

async fn subscribe(
    Extension(state): Extension<Arc<AppState>>,
    Json(payload): Json<SubscribeRequest>,
) -> impl IntoResponse {
    let email = payload.email.trim().to_lowercase();
    
    if email.is_empty() || !email.contains('@') {
         return (StatusCode::BAD_REQUEST, "Invalid email address").into_response();
    }

    let result = sqlx::query("INSERT OR IGNORE INTO newsletter_subscribers (email) VALUES (?)")
        .bind(&email)
        .execute(&state.pool)
        .await;

    match result {
        Ok(_) => (StatusCode::OK, "Subscribed successfully").into_response(),
        Err(e) => {
            tracing::error!("Failed to subscribe email {}: {:?}", email, e);
            (StatusCode::INTERNAL_SERVER_ERROR, "Failed to subscribe").into_response()
        }
    }
}

// Helper functions for auth (duplicated from admin.rs for now)
fn extract_email_from_token(headers: &HeaderMap, state: &AppState) -> Option<String> {
    let auth = headers.get(axum::http::header::AUTHORIZATION).and_then(|v| v.to_str().ok());
    if let Some(bearer) = auth {
        if let Some(token) = bearer.strip_prefix("Bearer ") {
            if let Ok(data) = decode::<Claims>(token, &DecodingKey::from_secret(state.jwt_secret.as_bytes()), &Validation::default()) {
                return Some(data.claims.email);
            }
        }
    }
    None
}

async fn is_admin_user(email: &str, state: &AppState) -> bool {
    let result = sqlx::query("SELECT role FROM users WHERE email = ?")
        .bind(email)
        .fetch_optional(&state.pool)
        .await;

    match result {
        Ok(Some(row)) => {
            let role: String = row.get("role");
            role == "admin"
        }
        _ => false,
    }
}

async fn send_newsletter(
    Extension(state): Extension<Arc<AppState>>,
    headers: HeaderMap,
    Json(payload): Json<SendNewsletterRequest>,
) -> impl IntoResponse {
    let email = match extract_email_from_token(&headers, &state) {
        Some(e) => e,
        None => return (StatusCode::UNAUTHORIZED, "Unauthorized").into_response(),
    };

    if !is_admin_user(&email, &state).await {
        return (StatusCode::FORBIDDEN, "Forbidden").into_response();
    }

    // 1. Fetch all subscribers
    let subscribers: Vec<(String,)> = match sqlx::query_as("SELECT email FROM newsletter_subscribers")
        .fetch_all(&state.pool)
        .await 
    {
        Ok(subs) => subs,
        Err(e) => {
            tracing::error!("Failed to fetch subscribers: {:?}", e);
            return (StatusCode::INTERNAL_SERVER_ERROR, "Failed to fetch subscribers").into_response();
        }
    };

    if subscribers.is_empty() {
        return (StatusCode::OK, "No subscribers found").into_response();
    }

    // 2. Send emails
    let mut success_count = 0;
    let mut fail_count = 0;

    for (sub_email,) in subscribers {
        let result = if payload.is_html {
            // Simple HTML wrapper if not provided
            let full_html = if payload.content.contains("<html") {
                payload.content.clone()
            } else {
                format!(
                    r#"<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            body {{ font-family: sans-serif; line-height: 1.6; color: #333; }}
                            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                            .footer {{ font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px; }}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            {}
                            <div class="footer">
                                <p>You are receiving this email because you subscribed to Nguyen Restaurant updates.</p>
                                <p>Georgenstraße 67, 80799 München</p>
                            </div>
                        </div>
                    </body>
                    </html>"#,
                    payload.content
                )
            };
            send_html_email(&state, &sub_email, &payload.subject, &full_html).await
        } else {
            send_email(&state, &sub_email, &payload.subject, &payload.content).await
        };

        match result {
            Ok(_) => success_count += 1,
            Err(e) => {
                tracing::error!("Failed to send newsletter to {}: {:?}", sub_email, e);
                fail_count += 1;
            }
        }
    }

    let message = format!("Newsletter sent. Success: {}, Failed: {}", success_count, fail_count);
    (StatusCode::OK, message).into_response()
}