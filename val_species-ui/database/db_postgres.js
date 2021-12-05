/*
  https://node-postgres.com/
*/
const os = require("os");
const env = "docker"; //bit of a hack, for now. options are "local" and "docker"
const config = require('../config').config;
const { Pool } = require('pg'); //a Postgres Connection Pool, not to be confused with a Vernal Pool
const connPool = new Pool(config[env]);
const types = require('pg').types;

console.log(`db_postgres.js says:`);
console.log(`hostname: ${os.hostname}`);
console.log("environment:", env);
console.dir(config[env]);
connPool.query('SELECT version()')
  .then(res => {console.log(`pg test query SUCCEEDED |`, res.rows[0]);})
  .catch(err => {console.log(`pg test query FAILED |`, err);});

/*
 * Fix date display error.
 * Simply by adding a function to return the raw value, we
 * override the pg_postgres default behavior, which mucks
 * date-only values by ‘correcting’ for local TZ. This is
 * confusing, because pg_postgres lives on the server, whose
 * TZ is UTC. It may be that moment(), running on the client
 * cannot properly process dates that contain an explicit
 * UTC TZ indicator with time set to 00:00, causing a correction
 * for TZ EST by subtracting 5 hours from midnight. In theory,
 * this would set the UI time back to the previous evening at 7P.
 *
 * pg_types uses postgres OIDs to identify db data types:
 *
 * date OID=1082
 * timestamp OID=1114
 *
*/
parseDate = function(val) {
   return val;
}

types.setTypeParser(1082, parseDate);

/*
NOTES:
*/
module.exports = {
  query: (text, params) => connPool.query(text, params)
};
