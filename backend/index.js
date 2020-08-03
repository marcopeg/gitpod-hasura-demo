/**
 * This is a super small webhook microservice.
 * It offers a simple REST interface that can receive a payload.
 *
 * It does one simple action:
 * it uses GraphQL to communicate back to Hasura.
 *
 * This example uses services composition from the @ForrestJS project:
 * https://forrestjs.github.io/
 */

const { runHookApp } = require("@forrestjs/hooks");
const serviceApollo = require("@forrestjs/service-apollo");
const serviceFastify = require("@forrestjs/service-fastify");
const serviceFastifyHealthz = require("@forrestjs/service-fastify-healthz");
const serviceFastifyApollo = require("@forrestjs/service-fastify-apollo");
const envalid = require("envalid");
const featureCapitalize = require("./feature-capitalize");

// Validate Environment:
const env = envalid.cleanEnv(process.env, {
  HASURA_ENDPOINT: envalid.url(),
  HASURA_TOKEN: envalid.str({ default: "" })
});

// Setup the App's capabilities as composition of services:
runHookApp({
  trace: "compact",
  settings: {
    apollo: {
      client: {
        config: {
          uri: `${env.HASURA_ENDPOINT}/v1/graphql`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.HASURA_TOKEN}`
          }
        }
      }
    }
  },
  services: [
    serviceApollo,
    serviceFastify,
    serviceFastifyHealthz,
    serviceFastifyApollo
  ],
  features: [featureCapitalize]
});
