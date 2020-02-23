import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "./lib/create-apollo-client";
import TodoView from "./views/TodoView";
import "./styles.css";

export default function App() {
  const client = createApolloClient({
    httpUrl:
      "https://8080-a5980606-7e72-4106-b314-8020861e921e.ws-eu01.gitpod.io",
    wsUrl: "wss://8080-a5980606-7e72-4106-b314-8020861e921e.ws-eu01.gitpod.io",
    token: {}
  });
  return (
    <ApolloProvider client={client}>
      <TodoView />
    </ApolloProvider>
  );
}
