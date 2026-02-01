-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    email TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
