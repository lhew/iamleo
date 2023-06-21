import { ApolloClient, InMemoryCache } from "@apollo/client";

const clientFactory = () => {
  return new ApolloClient({
    uri: process.env.GRAPHQL_API_URL || "http://localhost:3001/api/graphql",
    cache: new InMemoryCache(),
  });
};

const client = clientFactory();

export default client;
