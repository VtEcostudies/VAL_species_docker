const db = require('../database/db_postgres');
const query = db.query;
const dbUtil = require('../database/db_pgutil');
const parseColumns = dbUtil.parseColumns;
const whereClause = dbUtil.whereClause;

dbUtil.getColumns('val_species');

// Return count of all taxa.
exports.count = function(where, cb=function()) {
  query(`SELECT count(*) FROM val_species`)
    .then(res => {cb(null,res);})
    .catch(err => {cb(err,null);});
  }
};
