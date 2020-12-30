// taxa.js

var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function(req, res) {
    db.Taxa.findAll()
        .then( taxa => {
            res.status(200).send(JSON.stringify(taxa));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function(req, res) {
    db.Taxa.findByPk(req.params.id)
        .then( taxon => {
            res.status(200).send(JSON.stringify(taxon));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/", function(req, res) {
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

router.delete("/:id", function(req, res) {
    db.Taxa.destroy({
        where: {
            id: req.params.id
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
