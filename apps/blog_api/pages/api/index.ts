// import "reflect-metadata";
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { PostResolver } from "./resolvers/PostResolver";
// import { buildSchema } from "type-graphql";
// import { AppDataSource } from "./data-source";

// // export default async function app() {
// //   await AppDataSource.initialize();

// //   const schema = await buildSchema({
// //     resolvers: [PostResolver],
// //   });

// //   const server = new ApolloServer({ schema });

// //   const port = Number.parseInt(process.env.BLOG_API_PORT) || 4000;
// //   const { url } = await startStandaloneServer(server, {
// //     listen: { port },
// //   });

// //   console.log("Server has started at ", port);
// //   // console.log({ ready: true });
// // }

// export default function handler(req, res) {
//   res.status(200).json({ name: "John Doe" });
// }

import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

const resolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
    hello: () => "world",
  },
};

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    hello: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
