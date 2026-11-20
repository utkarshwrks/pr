-- Enquiry storage. The app creates this automatically on first use
-- (see src/lib/db.ts); this file is here for review and manual provisioning:
--   psql "$DATABASE_URL" -f db/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  company         TEXT NOT NULL,
  website         TEXT NOT NULL DEFAULT '',
  industry        TEXT NOT NULL,
  service         TEXT NOT NULL,
  budget          TEXT NOT NULL,
  message         TEXT NOT NULL,
  contact_method  TEXT NOT NULL,
  phone           TEXT NOT NULL DEFAULT '',
  consent_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  status          TEXT NOT NULL DEFAULT 'new',   -- new | contacted | qualified | won | closed
  source_path     TEXT NOT NULL DEFAULT '',
  ip_hash         TEXT NOT NULL DEFAULT ''       -- keyed hash, never the raw address
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_ip_hash_idx ON leads (ip_hash, created_at DESC);
