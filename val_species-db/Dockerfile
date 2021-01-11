FROM postgres:13.1-alpine
COPY *.sql /docker-entrypoint-initdb.d/
RUN chmod a+r /docker-entrypoint-initdb.d/*
EXPOSE 6543
