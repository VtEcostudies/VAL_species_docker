FROM node:latest
RUN mkdir -p /opt/val_ui
WORKDIR /opt/val_ui
RUN adduser --disabled-password val
COPY ./ .
RUN chown -R val:val /opt/val_ui
USER val
RUN npm install
EXPOSE 3001
# docker-compose depends_on is not enough to wait for pg. Added wait-for-pg.sh.
#CMD [ "npm", "run", "pm2" ]

# docker-compose environment overrides Dockerfile ENV statements.
# Dockerfile ENV statements for testing. Use --network=host with docker run.
ENV DB_HOST=localhost
ENV DB_PORT=6543
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_SCHEMA=val_species

# Add script and install psql to enable wait-for-pg.sh.
COPY wait-for-pg.sh /wait-for-pg.sh
USER root
RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive \
    apt-get install --no-install-recommends --assume-yes \
      postgresql-client
RUN chmod +x /wait-for-pg.sh

# DO NOT define both ENTRYPOINT here and command: (to call wait-for-pg.sh) in
# docker-compose. Do one or the other.
# NOTE: localhost, below, is not used. ENV DB_HOST is used instead.
ENTRYPOINT ["./wait-for-pg.sh","localhost","npm","run","pm2"]
USER val
