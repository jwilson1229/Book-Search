import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SearchBooks from '../src/pages/SearchBooks';
import SavedBooks from '../src/pages/SavedBooks';
import SignupForm from '../src/components/SignupForm';
import LoginForm from '../src/components/LoginForm';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your Apollo Server URL
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <SearchBooks />
        <SavedBooks />
        <SignupForm />
        <LoginForm />
      </div>
    </ApolloProvider>
  );
};

export default App;
