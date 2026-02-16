import { Pool, types } from "pg";
import { config } from "./index";
// console.log("db string: ", process.env.DATABASE_URL);

types.setTypeParser(20, (val) => Number(val));

export const pool = new Pool({
  connectionString: config.databaseUrl,
});
