import { Pool } from "pg";
import { config } from "./index";
// console.log("db string: ", process.env.DATABASE_URL);

export const pool = new Pool({
  connectionString: config.databaseUrl,
});
