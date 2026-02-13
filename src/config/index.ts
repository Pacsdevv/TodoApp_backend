import dotenv from "dotenv";
dotenv.config();

export type Config = {
  port: number;
  databaseUrl: string;
  jwtSecret: string;
};

export const config: Config = {
  port: Number(process.env.PORT || "3000"),
  databaseUrl: process.env.DATABASE_URL || "",
  jwtSecret: process.env.JWT_SECRET || "",
};
