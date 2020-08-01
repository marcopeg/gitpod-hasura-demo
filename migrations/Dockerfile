FROM frolvlad/alpine-glibc

# Install HasuraCLI for alpine distribution
# https://github.com/hasura/graphql-engine/issues/4105
RUN apk add curl libstdc++
RUN curl -L# -f -o "/usr/local/bin/hasura" "https://github.com/hasura/graphql-engine/releases/download/v1.3.0/cli-hasura-linux-amd64"
RUN chmod +x "/usr/local/bin/hasura"

# Prepare data volumes for docker-compose to map it
# and make it possible to use dynamic data
VOLUME /migrations
VOLUME /metadata
VOLUME /seeds

# Add the executable script that will perform the full migration
ADD ./docker-migrate.sh /docker-migrate.sh
RUN chmod +x docker-migrate.sh

# Add a basic yaml config file that let the migration target the local hasura container
ADD ./config.yaml /config.yaml

ENTRYPOINT ["/docker-migrate.sh"]
