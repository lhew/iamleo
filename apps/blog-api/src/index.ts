import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PostResolver } from "./resolvers/PostResolver";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";

const dotenv = require("dotenv");
dotenv.config();

async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [PostResolver],
  });

  const server = new ApolloServer({ schema });

  const port = Number.parseInt(process.env.API_PORT) || 4000;
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log("Server has started at ", port);
  // console.log({ ready: true });
}
main();
