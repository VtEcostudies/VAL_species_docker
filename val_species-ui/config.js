const secrets = require('./secrets').secrets;

console.log(`config.js secrets`, secrets);

const config = {
  local: {
    "user": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASSWORD || secrets.local,
    "database": process.env.DB_SCHEMA || 'postgres',
    "host": process.env.DB_HOST || 'localhost',
    "port": process.env.DB_PORT || 5433,
    "ssl": process.env.DB_SSL == "true"
  },
  docker: {
    "user": process.env.DB_USER || 'postgres',
    "password": process.env.DB_PASSWORD || secrets.docker,
    "database": process.env.DB_SCHEMA || 'val_species',
    "host": process.env.DB_HOST || 'localhost',
    "port": process.env.DB_PORT || 6543,
    "ssl": process.env.DB_SSL == "true"
  },
  email_hostname: 'vtecostudies.org',
  app_servicename: 'VAL Species Registry',
  openRoutes: [
    '/user/init',
    '/',
    '/taxon/list',
    '/taxon/*/detail',
    { url: /^\/taxon\/.*/, methods: ['GET'] } // /taxon/:id
  ]
}

module.exports = {config};
