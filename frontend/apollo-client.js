import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: `${process.env.MONGODB_URI}/graphql`,
});

export default client;
