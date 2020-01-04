import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { MoviesTable } from "./components/MoviesTable";
import {DirectorsTable} from "./components/DirectorsTable";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <MoviesTable />
        <DirectorsTable />
      </div>
    </ApolloProvider>

  );
}

export default App;
