#!/usr/bin/env sh

hasura migrate apply --endpoint ${HASURA_ENDPOINT} --skip-update-check
hasura metadata apply --endpoint ${HASURA_ENDPOINT} --skip-update-check
hasura seeds apply --endpoint ${HASURA_ENDPOINT} --skip-update-check
