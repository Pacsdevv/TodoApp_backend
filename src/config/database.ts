import { Pool } from "pg";
import { config } from "dotenv";
config({ path: ".env" });

console.log("db string: ", process.env.DATABASE_URL);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
