var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/", function(req, res) {
    db.Users.findAll()
        .then( users => {
            res.status(200).send(JSON.stringify(users));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.get("/:id", function(req, res) {
    db.Users.findByPk(req.params.id)
        .then( user => {
            res.status(200).send(JSON.stringify(user));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
module.exports = router;
