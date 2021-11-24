//var Taxon = require('../models/taxon');
var db = require('../database/db_postgres');
var query = db.query;
const dbUtil = require('../database/db_pgutil');
const parseColumns = dbUtil.parseColumns;
const whereClause = dbUtil.whereClause;
var async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = function(req, res) {
    query(`SELECT
        (SELECT count(*) FROM val_species) AS taxon_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='kingdom') AS kingdom_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='phylum') AS phylum_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='class') AS class_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='order') AS order_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='family') AS family_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='genus') AS genus_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='species') AS species_count,
        (SELECT count(*) FROM val_species WHERE "taxonRank"='subspecies') AS subspecies_count,
        (SELECT count(*) FROM val_species WHERE "taxonomicStatus"!='accepted') AS synonym_count
        `
      )
      .then(ret => {
        console.log(ret.rows[0]);
        res.render('index', { title: 'VAL Species Registry', error: null, data: ret.rows[0] });
      })
      .catch(err => {
        console.log(err.message);
        res.render('index', { title: 'VAL Species Registry', error: err, data: {} });
      });
};

// Display list of all taxa that meet search criteria passed as query params.
exports.taxon_list = function(req, res) {
  const limit = req.query.limit || 100;
  const offset = req.query.offset || 0;

  var where = whereClause(req.query, [], 'WHERE', 'val_species');
  console.dir(where);
  query(`SELECT * FROM val_species ${where.text} LIMIT ${limit} OFFSET ${offset}`, where.values)
    .then(ret => {
      //console.dir(ret.rows);
      res.render('taxon_list', { title: 'VAL Taxon List', search: req.query, error: null, taxon_list: ret.rows });
    })
    .catch(err => {
      res.render('taxon_list', { title: 'VAL Taxon List', search: req.query, error: err, taxon_list: [] });
    });
};

// Display detail page for a specific taxonId. id passed as route param.
exports.taxon_detail = function(req, res) {
  query(`SELECT * FROM val_species WHERE "taxonId"=$1`, [req.params.id])
    .then(ret => {
      //console.log(`taxonController::taxon_detail`, ret.rows[0]);
      res.render('taxon_detail', { title: 'VAL Taxon Detail', taxonId: req.params.id, error: null, taxon_list: ret.rows });
    })
    .catch(err => {
      res.render('taxon_detail', { title: 'VAL Taxon Detail', taxonId: req.params.id, error: err, taxon_list: [] });
    });
};

// Display taxon create form on GET.
exports.taxon_create_get = function(req, res) {
    res.render('taxon_create', { title: 'Create VAL Taxon', taxonId: '', error: null, taxon: {} });
};

// Handle taxon create on POST.
exports.taxon_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Taxon create POST');
};

// Display taxon update form on GET.
exports.taxon_update_get = function(req, res) {
  query(`SELECT * FROM val_species WHERE "taxonId"=$1`, [req.params.id])
    .then(ret => {
      res.render('taxon_create', { title: 'Update VAL Taxon', taxonId: req.params.id, error: null, taxon: ret.rows[0] });
    })
    .catch(err => {
      res.render('taxon_create', { title: 'Update VAL Taxon', taxonId: req.params.id, error: err, taxon: {} });
    });
};

// Handle taxon update on POST.
exports.taxon_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Taxon update POST');
};

// Display taxon delete form on GET.
exports.taxon_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Taxon delete GET');
};

// Handle taxon delete on POST.
exports.taxon_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Taxon delete POST');
};
