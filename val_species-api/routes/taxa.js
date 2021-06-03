var express = require('express');
var router = express.Router();
var db = require('../database');

var columns = [];
Object.keys(db.Taxa.rawAttributes).forEach(column => {
  columns.push(column);
});
//console.log('val_species rawAttributes |', columns);

const whereClause = (query) => {
  var clause = {
      limit: query.limit || 1000,
      offset: query.offset || 0,
      where: {}
    };
  Object.keys(query).forEach(param => {
    if (columns.includes(param)) {
      clause.where[param] = query[param];
    }
  });
  console.log('taxa.js | whereClause |', clause);
  return clause;
};

router.get(["/","/all"], function(req, res) {
  var condition = whereClause(req.query);

  db.Taxa.findAll(condition)
      .then( taxa => {
          //res.status(200).send(JSON.stringify(taxa));
          res.status(200).send(taxa);
      })
      .catch( err => {
          //res.status(500).send(JSON.stringify(err));
          console.log(`taxa.js | GET | ERROR | db.sequelize.config:`, db.sequelize.config);
          res.status(500).send(err);
      });
});

router.get("/:taxonId", function(req, res) {
    db.Taxa.findByPk(req.params.taxonId)
        .then( taxon => {
            res.status(200).send(taxon);
        })
        .catch( err => {
            res.status(500).send(err);
        });
});

router.post("/", function(req, res) {
    db.Taxa.create({
        taxonId: req.body.taxonId,
        scientificName: req.body.scientificName,
        taxonRank: req.body.taxonRank
        })
        .then( taxon => {
            res.status(200).send(taxon);
        })
        .catch( err => {
            res.status(500).send(err);
        });
});

router.put("/:taxonId", function(req, res) {
    db.Taxa.update({
          scientificName: req.body.scientificName,
          taxonRank: req.body.taxonRank
        }, {
          where: {taxonId: req.params.taxonId}
        })
        .then( taxon => {
          console.log(`***CUSTOM MESSAGE*** | PUT /taxa/:${req.params.taxonId} result: ${taxon}`)
          if (taxon & taxon != 0) {
            res.status(200).send(taxon);
          } else {
            res.status(404).send(taxon);
          }
        })
        .catch( err => {
            res.status(500).send(err);
        });
});

router.delete("/:taxonId", function(req, res) {
    db.Taxa.destroy({
        where: {
            taxonId: req.params.taxonId
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(err);
        });
});

module.exports = router;
