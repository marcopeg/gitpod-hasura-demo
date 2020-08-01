import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider, useTheme } from "@material-ui/core/styles";
import { createApolloClient } from "./lib/create-apollo-client";
import TodoView from "./containers/TodoView";
import "./styles.css";

// Collect the HASURA_URL with fallback on local development only during development
const HASURA_URL =
  process.env.REACT_APP_HASURA_URL ||
  (() => {
    if (process.env.NODE_ENV !== "development")
      throw new Error("Env.REACT_APP_HASURA_URL is required");
    return "http://localhost:8080";
  })();

const client = createApolloClient({
  httpUrl: HASURA_URL,
  wsUrl: HASURA_URL.replace("http", "ws"),
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
