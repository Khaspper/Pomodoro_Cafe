"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function main() {
    console.log("Seeding...");
    const connectionString = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;
    const client = new pg_1.Client({
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
//# sourceMappingURL=populatedb.js.map