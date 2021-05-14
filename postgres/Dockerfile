# Use latest Postgres 9 image as parent image
FROM postgres:9

# Create user and database bibshare 
COPY ./init-user-db.sh /docker-entrypoint-initdb.d/
