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

router.post("/", function(req, res) {
    db.Users.create({
        email: req.body.email,
        password: req.body.password
        })
        .then( user => {
            res.status(200).send(JSON.stringify(user));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.put("/:id", function(req, res) {
    db.Users.update({
          email: req.body.email,
          password: req.body.password
          }, {
            where: {id: req.params.id}
        })
        .then( user => {
          if (user & user != 0) {
              res.status(404).send(JSON.stringify(user));
            } else {
              res.status(200).send(JSON.stringify(user));
            }
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
});

router.delete("/:id", function(req, res) {
    db.Users.destroy({
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
