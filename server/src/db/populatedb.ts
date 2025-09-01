import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("Seeding...");
  const connectionString =
    process.env.DATABASE_PUBLIC_URL || process.env.DEV_DATABASE_URL;
  const client = new Client({
    connectionString,
  });
  await client.connect();
  await client.query(`
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);

  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

  CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`);
  await client.end();
  console.log("done");
}
main();
