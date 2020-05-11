# https://hasura.io/docs/1.0/graphql/manual/migrations/advanced/auto-apply-migrations.html#auto-apply-migrations
FROM hasura/graphql-engine:latest.cli-migrations-v2
CMD  mkdir /hasura-metadata
COPY ./hasura/* /hasura-metadata/
CMD ls
