/**
 * Todo Capitalize Feature
 * =======================
 *
 * This modules exposes the business logic of the capitalization feature.
 * It integrates with @ForrestJS/hooks in order to expose a custom REST endpoint
 */

const { FEATURE } = require("@forrestjs/hooks");
const gql = require("graphql-tag");

const UPDATE_TODO_TEXT = gql`
  mutation updateTodoText($id: Int!, $text: String!) {
    update_todos(where: { id: { _eq: $id } }, _set: { text: $text }) {
      affected_rows
    }
  }
`;

/**
 * Fastify's Route Handler
 * =======================
 *
 * Here we receive a package from Hasura and send back an update mutation
 * in order to make the first letter capitalized.
 *
 * NOTE: it makes use of the Apollo client that is decorated into the
 *       Fastify instance.
 */
const routeHandler = async (req) => {
  const { id, text } = req.body.event.data.new;

  const res = await req.apollo.mutate({
    mutation: UPDATE_TODO_TEXT,
    variables: {
      id,
      text: text[0].toUpperCase() + text.slice(1)
    }
  });

  return `+OK ${res.data.update_todos.affected_rows}`;
};

const actionHandler = ({ registerRoute }) =>
  registerRoute({
    method: "POST",
    url: "/",
    handler: routeHandler
  });

module.exports = ({ registerAction }) =>
  registerAction({
    hook: "$FASTIFY_ROUTE",
    name: `${FEATURE} featureCapitalize`,
    handler: actionHandler
  });
