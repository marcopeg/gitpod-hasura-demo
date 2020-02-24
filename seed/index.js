const envalid = require("envalid");
const sdk = require("hasura-sdk");

const env = envalid.cleanEnv(process.env, {
  HASURA_ENDPOINT: envalid.url(),
  HASURA_TOKEN: envalid.str({ default: "" })
});

(async () => {
  sdk.init({
    endpoint: "http://localhost:8080/v1/query",
    adminSecret: ""
  });

  console.log("Create table: todos");
  const r1 = await sdk.query(
    `
      CREATE TABLE IF NOT EXISTS public.todos (
        id SERIAL,
        text text NOT NULL,
        completed boolean DEFAULT false NOT NULL,
        created_at timestamp with time zone DEFAULT now() NOT NULL,
        updated_at timestamp with time zone DEFAULT now() NOT NULL
      );
    `,
    {},
    { throw: false }
  );
  console.log(r1);
  console.log("\n");

  console.info("Track table: todos");
  const r2 = await sdk.call(
    {
      type: "track_table",
      args: {
        schema: "public",
        name: "todos"
      }
    },
    {
      throw: false
    }
  );
  console.log(r2.success ? r2 : r2.errors[0].response.data.error);
  console.log("\n");

  console.info("Create trigger on: todos");
  const r3 = await sdk.call(
    {
      type: "create_event_trigger",
      args: {
        name: "todos-capitalize",
        table: "todos",
        webhook: "http://localhost:4000",
        insert: {
          columns: ["text"],
          payload: "*"
        },
        replace: false
      }
    },
    {
      throw: false
    }
  );
  console.log(r3.success ? r3 : r3.errors[0].response.data.error);
  console.log("\n");
})().catch(err => {
  console.error(err.message);
  if (err.details) {
    console.info(err.details.errors[0]);
  }
});
