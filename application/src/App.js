import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { MoviesTable } from "./components/MoviesTable";
import { DirectorsTable } from "./components/DirectorsTable";
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Tabs justified={true}>
        <Tab value="movies" label="Фильмы">
          <MoviesTable />
        </Tab>
        <Tab value="directors" label="Режисеры">
          <DirectorsTable />
        </Tab>
      </Tabs>
    </ApolloProvider>
  );
}

export default App;
