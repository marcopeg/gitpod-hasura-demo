import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

/**
 *
 * @param {object|string} token Either an authorisation JWT, or a list of headers
 *                              to be applied to the requests
 *
 */
export const createApolloClient = ({ token, httpUrl, wsUrl }) => {
  const headers =
    typeof token === "object"
      ? token
      : { authorization: token ? `Bearer ${token}` : "" };

  const cache = new InMemoryCache();

  // Create an http link:
  const httpLink = new HttpLink({
    uri: `${httpUrl}/v1/graphql`,
    headers
  });

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: `${wsUrl}/v1/graphql`,
    options: {
      reconnect: true,
      connectionParams: { headers }
    }
  });

  // split links based on operation type
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
      },
      query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
      }
    }
  });
};
