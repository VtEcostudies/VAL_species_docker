var express = require('express');
var router = express.Router();
var db = require('../database');

router.get(["/","/all"], function(req, res) {
    db.Taxa.findAll()
        .then( taxa => {
            res.status(200).send(JSON.stringify(taxa));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:taxonId", function(req, res) {
    db.Taxa.findByPk(req.params.taxonId)
        .then( taxon => {
            res.status(200).send(JSON.stringify(taxon));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.post("/", function(req, res) {
    db.Taxa.create({
        taxonId: req.body.taxonId,
        scientificName: req.body.scientificName,
        taxonRank: req.body.taxonRank
        })
        .then( taxon => {
            res.status(200).send(JSON.stringify(taxon));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
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
            res.status(200).send(JSON.stringify(taxon));
          } else {
            res.status(404).send(JSON.stringify(taxon));
          }
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
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
            res.status(500).send(JSON.stringify(err));
        });
});

module.exports = router;
