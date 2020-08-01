/**
 * This is a super small webhook microservice.
 * It offers a simple REST interface that can receive a payload.
 * It does one simple action.
 * It uses GraphQL to communicate back to Hasura.
 */

const envalid = require("envalid");
const fastify = require("fastify")({ logger: false });
const ApolloClient = require("apollo-boost").default;
const gql = require("graphql-tag");
require("cross-fetch/polyfill");

// Validate Environment
const env = envalid.cleanEnv(process.env, {
  PORT: envalid.port({ default: 4000 }),
  HASURA_ENDPOINT: envalid.url(),
  HASURA_TOKEN: envalid.str({ default: "" })
});

const SERVER_PORT = env.PORT;

// GraphQL Client
const apollo = new ApolloClient({
  uri: `${env.HASURA_ENDPOINT}/v1/graphql`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.HASURA_TOKEN}`
  }
});

const UPDATE_TODO_TEXT = gql`
  mutation updateTodoText($id: Int!, $text: String!) {
    update_todos(where: { id: { _eq: $id } }, _set: { text: $text }) {
      affected_rows
    }
  }
`;

fastify.route({
  method: "POST",
  url: "/",
  handler: async req => {
    const { id, text } = req.body.event.data.new;

    const res = await apollo.mutate({
      mutation: UPDATE_TODO_TEXT,
      variables: {
        id,
        text: text[0].toUpperCase() + text.slice(1)
      }
    });

    return `+OK ${res.data.update_todos.affected_rows}`;
  }
});

// Status check route
fastify.route({
  method: "GET",
  url: "/ping",
  handler: async () => "pong"
});

// Boot
(async () => {
  try {
    const address = await fastify.listen(SERVER_PORT, "::");
    fastify.log.info(`running on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();
