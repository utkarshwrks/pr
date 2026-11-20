import "server-only";
import { Pool } from "pg";

/**
 * PostgreSQL access. The connection string lives only in DATABASE_URL on the
 * server; nothing here is ever bundled for the browser ("server-only").
 */

const globalForDb = globalThis as unknown as {
  __pgPool?: Pool;
  __pgSchemaReady?: Promise<void>;
};

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForDb.__pgPool) {
    // `sslmode=` in the connection string is honoured by pg itself. Use
    // DATABASE_SSL only when the URL has no sslmode: "true" verifies the
    // server certificate, "no-verify" encrypts without verifying it.
    const sslEnv = process.env.DATABASE_SSL;
    const ssl =
      sslEnv === "true"
        ? true
        : sslEnv === "no-verify"
          ? { rejectUnauthorized: false }
          : undefined;
    globalForDb.__pgPool = new Pool({
      connectionString,
      // Keep this low on serverless hosts or behind a small connection limit.
      max: Number(process.env.DATABASE_POOL_MAX) || 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 8_000,
      ssl,
    });
    // An idle client erroring must not crash the process.
    globalForDb.__pgPool.on("error", (err) => {
      console.error("[db] idle client error:", err.message);
    });
  }
  return globalForDb.__pgPool;
}

/** Mirrors db/schema.sql. Idempotent, so it is safe to run on every cold start. */
const SCHEMA = `
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
    status          TEXT NOT NULL DEFAULT 'new',
    source_path     TEXT NOT NULL DEFAULT '',
    ip_hash         TEXT NOT NULL DEFAULT ''
  );
  CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
  CREATE INDEX IF NOT EXISTS leads_ip_hash_idx ON leads (ip_hash, created_at DESC);
`;

function ensureSchema(): Promise<void> {
  if (!globalForDb.__pgSchemaReady) {
    globalForDb.__pgSchemaReady = getPool()
      .query(SCHEMA)
      .then(() => undefined)
      .catch((err) => {
        globalForDb.__pgSchemaReady = undefined;
        throw err;
      });
  }
  return globalForDb.__pgSchemaReady;
}

export async function query<T extends Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  await ensureSchema();
  const result = await getPool().query(text, params);
  return result.rows as T[];
}
