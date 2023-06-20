import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
} = process.env as Record<string, string>;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Post],
  migrations: [],
  subscribers: [],
});
