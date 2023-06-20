import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { AppDataSource } from "./data-source";
import { buildSchemaSync } from "type-graphql";
import { PostResolver } from "./resolvers/PostResolver";

const schema = buildSchemaSync({
  resolvers: [PostResolver],
});

const server = new ApolloServer({
  schema,
  introspection: true,
});

export default startServerAndCreateNextHandler(server, {
  context: async (ctx) => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return await ctx;
  },
});
