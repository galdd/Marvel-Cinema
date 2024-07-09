import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  uri: `http://localhost:4000/graphql`, 
});

export default apolloClient;