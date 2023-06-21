import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { AppDataSource } from "../data-source";
import { buildSchemaSync } from "type-graphql";
import { PostResolver } from "../resolvers/PostResolver";
import { NextRequest, NextResponse } from "next/server";

const schema = buildSchemaSync({
  resolvers: [PostResolver],
});

const server = new ApolloServer({
  schema,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (ctx) => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    return await ctx;
  },
});

const addResponse = (res: NextResponse) => {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res.headers;
};

export async function GET(req: NextRequest) {
  const response = await handler(req);

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export async function OPTIONS(req: NextRequest) {
  const response = await handler(req);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

export async function POST(req: NextRequest) {
  // ...

  const response = await handler(req);
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
