import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: `https://vocaccion-backend-production.up.railway.app/graphql`,
});

export default client;
