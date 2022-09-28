import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

const uri = process.env.NEXT_PUBLIC_SERVER_URI + '/graphql';

const client = new ApolloClient({
  cache,
  uri,
});

export default client;
