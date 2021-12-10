const db = require('../database/db_postgres');
const query = db.query;
const dbUtil = require('../database/db_pgutil');
const parseColumns = dbUtil.parseColumns;
const whereClause = dbUtil.whereClause;

dbUtil.setColumns('val_species') //initialize the db connection for this controller by populating the stored list of table columns
  .then(ret => {console.log(`taxonController::setColumns | result:`, ret);})
  .catch(err => {console.log(`taxonController::setColumns |`, err);})

exports.init = function(req, res) {
  dbUtil.setColumns('val_species') //initialize the db connection for this controller by populating the stored list of table columns
    .then(ret => {res.json(ret);})
    .catch(err => {res.json(err);})
}

// Display index home page
exports.index = function(req, res) {
    search = {taxonId: '', scientificName:''}; //req.body.search?

    query(`SELECT
        (SELECT count(*) FROM val_species) AS taxon_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='kingdom') AS kingdom_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='phylum') AS phylum_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='class') AS class_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='order') AS order_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='family') AS family_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='genus') AS genus_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='species') AS species_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='subspecies' OR "taxonRank"='variety') AS subspecies_count,
        (SELECT count(*) FROM val_species WHERE "taxonomicStatus" LIKE '%synonym%') AS synonym_count
        `
      )
      .then(ret => {
        console.log(ret.rows[0]);
        res.render('index', { title: 'Search VAL Species Registry', search: search, data: ret.rows[0], user: req.user, error: null });
      })
      .catch(err => {
        console.log(err.message);
        res.render('index', { title: 'Search VAL Species Registry', search: search, data: {}, user: req.user, error: err });
      });
};

// Display a list of all taxa that meet search criteria passed as body params from the Search page.
/*
  Details:
    - Search page Search button posts to /taxa/list with body params
    - move non-null body params to req.query
    - call taxon_list_get
*/
exports.taxon_list_post = function(req, res) {
  console.log('index_post | req.post:', req.body);

  var exact = req.body.exactMatch || 0;
  //delete req.body.exactMatch;

  // copy req.body to req.query before invoking the taxon_list_get method
  Object.keys(req.body).forEach((key,idx) => {
    if (req.body[key]) { //transfer non-null keys to req.query
      if (exact) { //exact match
        req.query[key] = req.body[key];
      } else { //partial match
        req.query[`${key}|LIKE`] = `%${req.body[key]}%`;
      }
    }
  });
  taxon_list_get(req, res);
}

// Display list of all taxa that meet search criteria passed as query params.
exports.taxon_list_get = function(req, res) {
  console.log('taxon_list_get | req.query:', req.query);
  taxon_list_get(req, res);
};

function taxon_list_get(req, res) {
  const limit = req.query.limit || 100;
  const offset = req.query.offset || 0;

  var where = whereClause(req.query, [], 'WHERE', 'val_species');
  console.log(where);

  const subQ = `SELECT COUNT(*) FROM val_species  ${where.text}`;

  query(`SELECT *,(${subQ}) AS count FROM val_species ${where.text} LIMIT ${limit} OFFSET ${offset}`, where.values)
    .then(ret => {
      //console.dir(ret.rows);
      res.render('taxon_list', { title: 'VAL Taxon List', search: req.query, taxon_list: ret.rows, user: req.user, error: null, count:ret.rows[0].count });
    })
    .catch(err => {
      res.render('taxon_list', { title: 'VAL Taxon List', search: req.query, taxon_list: [], user: req.user, error: err });
    });
}

// Display detail page for a specific taxonId. id passed as route param, req.params.id
exports.taxon_detail_get = function(req, res) {

  query(`SELECT * FROM val_species WHERE "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.render('taxon_detail', { title: 'VAL Taxon Detail', taxonId: req.params.id, taxon_list: ret.rows, user: req.user, error: null });
    })
    .catch(err => {
      res.render('taxon_detail', { title: 'VAL Taxon Detail', taxonId: req.params.id, taxon_list: [], user: req.user, error: err });
    });
};

// Display taxon create form on GET.
exports.taxon_create_get = function(req, res, next) {
    res.render('taxon_create', { title: 'Create VAL Taxon', taxonId: '', taxon: {}, user: req.user, errors: null });
};

// Handle taxon create on POST.
exports.taxon_create_post = (req, res) => {
  create_taxon(req, res);
};

// Reusable function to create a new taxon and respond accordingly using express vars.
function create_taxon(req, res) {
  const parsed = parseColumns(req.body, 1, [], [], 'val_species');
  const sql = `INSERT INTO val_species (${parsed.named}) values (${parsed.numbered}) RETURNING *`;

  console.log(sql, parsed.values);

  query(sql, parsed.values)
    .then(ret => {
      res.redirect(`/taxon/${ret.rows[0].taxonId}`);
    })
    .catch(err => {
      console.log(err);
      errs = [{param:err.column, msg:err.message, location:'body'}];
      console.log(`postgres INSERT error:`, errs)
      res.render('taxon_create', { title: 'Create VAL Taxon', taxonId: req.params.id, taxon: req.body, user: req.user, errors: errs});
    });
}

// Display taxon update form on GET.
exports.taxon_update_get = function(req, res) {
  show_update_form(req, res)
};

// Reusable function to show/populate taxon update form based on id (taxonId). Response to express res var.
function show_update_form(req, res) {
  query(`SELECT * FROM val_species WHERE "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.render('taxon_create', { title: 'Update VAL Taxon', taxonId: req.params.id, taxon: ret.rows[0], user: req.user, error: null });
    })
    .catch(err => {
      //passing the value 'taxonId' indicates this is an UPDATE not an INSERT
      res.render('taxon_create', { title: 'Update VAL Taxon', taxonId: req.params.id, taxon: {}, user: req.user, error: err });
    });
}

// Handle taxon update on POST.
exports.taxon_update_post = function(req, res) {
    update_taxon(req, res);
};

// Reusable function to update existing taxon and respond accordingly using express vars.
// NOTE: this assumes req.params.id is set to the taxonId to be updated. You may have to set that explicitly before calling.
function update_taxon(req, res) {
  const parsed = parseColumns(req.body, 2, [req.params.id], [], 'val_species');
  const sql = `UPDATE val_species SET (${parsed.named}) = (${parsed.numbered}) WHERE "taxonId"=$1 RETURNING *`;

  console.log(sql, parsed.values);

  query(sql, parsed.values)
    .then(ret => {
      res.redirect(`/taxon/${ret.rows[0].taxonId}`);
    })
    .catch(err => {
      console.log(err);
      errs = [{param:err.column, msg:err.message, location:'body'}];
      console.log(`postgres UPDATE error:`, errs)
      res.render('taxon_create', { title: 'Create VAL Taxon', taxonId: req.params.id, taxon: req.body, user: req.user, errors: errs});
    });
}

// Display taxon delete form on GET.
exports.taxon_delete_get = function(req, res) {
  show_delete_form(req, res);
};

// Reusable function to show delete taxon form based on raw 'id' (taxonId). Response to express res var.
function show_delete_form(req, res) {
  query(`SELECT * FROM val_species WHERE "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.render('taxon_delete', { title: 'Delete VAL Taxon', taxonId: req.params.id, taxon_list: ret.rows, user: req.user, error: null });
    })
    .catch(err => {
      res.render('taxon_delete', { title: 'Delete VAL Taxon', taxonId: req.params.id, taxon_list: [], user: req.user, error: err });
    });
}

// Handle taxon delete on POST.
exports.taxon_delete_post = function(req, res) {
  console.log(`taxon_delete_post`);
  delete_taxon(req, res);
};

function delete_taxon(req, res) {
  const sql=`DELETE FROM val_species WHERE "taxonId"=$1`
  query(sql,[req.params.id])
    .then(ret => {
      res.redirect(`/taxon/list?taxonId=${req.params.id}`);
    })
    .catch(err => {
      res.render('taxon_delete', { title: 'Delete VAL Taxon', taxonId: req.params.id, taxon_list: [], user: req.user, error: err });
    })
}
