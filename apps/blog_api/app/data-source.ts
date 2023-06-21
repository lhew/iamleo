import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

const {
  BLOG_POSTGRES_USER,
  BLOG_POSTGRES_PASSWORD,
  BLOG_POSTGRES_PORT,
  BLOG_POSTGRES_HOST,
  BLOG_POSTGRES_DATABASE,
} = process.env as NodeJS.Process["env"];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: BLOG_POSTGRES_HOST,
  port: parseInt(BLOG_POSTGRES_PORT as string, 10),
  username: BLOG_POSTGRES_USER,
  password: BLOG_POSTGRES_PASSWORD,
  database: BLOG_POSTGRES_DATABASE,
  synchronize: true,
  entities: [Post],
  migrations: [],
  subscribers: [],
  ssl: process.env.NODE_ENV === "production",
});
