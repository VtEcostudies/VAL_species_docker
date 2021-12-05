#!/bin/sh
# wait-for-pg.sh

set -e

host="$1"
shift

#until PGPASSWORD="postgres" psql -h "$host" -p "6543" -U "postgres" -c '\q'; do
#until PGPASSWORD=$DB_PASSWORD psql -h "$host" -p $DB_PORT -U $DB_USER -c '\q'; do
until PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c '\q'; do
  >&2 echo " |:-(   |:-(   |:-(   |:-(   |:-(   Postgres is unavailable - sleeping |:-(   |:-(   |:-(   |:-(   |:-(   "
  sleep 1
done

>&2 echo "****************************Postgres IS UP!!!!! - executing command*************************************"
exec "$@"
