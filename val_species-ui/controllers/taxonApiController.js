const db = require('../database/db_postgres');
const query = db.query;
const dbUtil = require('../database/db_pgutil');
const parseColumns = dbUtil.parseColumns;
const whereClause = dbUtil.whereClause;

/*
dbUtil.setColumns('val_species') //initialize the db connection for this controller by populating the stored list of table columns
  .then(ret => {console.log(`taxonApiController::setColumns | result:`, ret);})
  .catch(err => {console.log(`taxonApiController::setColumns |`, err);})
*/
// Display list of all taxa.
exports.taxon_list = function(req, res) {
  const limit = req.query.limit || 1000;
  const offset = req.query.offset || 0;
  query(`SELECT * FROM val_species offset $1 limit $2`, [offset, limit])
    .then(ret => {
      res.send(ret.rows);
    })
    .catch(err => {
      res.send(err.message);
    });
};

// Display detail page for a specific taxon.
exports.taxon_detail = function(req, res) {
  query(`SELECT * FROM val_species where "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.send(ret.rows);
    })
    .catch(err => {
      res.send(err.message);
    });
};

/*
  Handle taxon create on POST.
  function parseColumns(body={}, idx=1, cValues=[], staticColumns=[], tableName='none') ...
  return { 'named': cNames, 'numbered': cNumbr, 'values': cValues };
*/
exports.taxon_create_post = function(req, res) {
  var qCols = parseColumns(req.body, 1, [], [], 'val_species');
  var sql = `INSERT INTO val_species (${qCols.named}) VALUES (${qCols.numbered}) RETURNING "taxonId"`;

  console.log(sql, qCols.values);

  query(sql, qCols.values)
    .then(ret => {
      res.send(ret.rows);
    })
    .catch(err => {
      res.send(err.message);
    });
};

/*
  Handle taxon update on POST.
  function parseColumns(body={}, idx=1, cValues=[], staticColumns=[], tableName='none') ...
  return { 'named': cNames, 'numbered': cNumbr, 'values': cValues };
*/
exports.taxon_update_post = function(req, res) {
  var qCols = parseColumns(req.body, 2, [req.params.id], [], 'val_species');
  var sql = `UPDATE val_species SET (${qCols.named}) = (${qCols.numbered}) WHERE "taxonId"=$1 RETURNING "taxonId"`;

  console.log(sql, qCols.values);

  query(sql, qCols.values)
    .then(ret => {
      res.send(ret.rows);
    })
    .catch(err => {
      res.send(err.message);
    });
};

// Handle taxon delete on POST.
exports.taxon_delete_post = function(req, res) {
  query(`DELETE FROM val_species where "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.send(ret.rows);
    })
    .catch(err => {
      res.send(err.message);
    });
};
