import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import { createApolloClient } from "./lib/create-apollo-client";
import TodoView from "./containers/TodoView";
import "./styles.css";

const client = createApolloClient({
  httpUrl: process.env.REACT_APP_HASURA_URL,
  wsUrl: process.env.REACT_APP_HASURA_URL.replace("http", "ws"),
  token: {}
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={useTheme()}>
      <TodoView />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
