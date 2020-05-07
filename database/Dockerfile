# https://hub.docker.com/_/postgres
FROM postgres:alpine
# Default DB - Created on container run
ENV POSTGRES_DB herearesomedogs
COPY ./scripts/  /docker-entrypoint-initdb.d/