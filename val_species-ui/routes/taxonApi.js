var express = require('express');
var router = express.Router();

// Require controller module.
var taxon_controller = require('../controllers/taxonApiController');

// GET request for list of all Taxa.
router.get('/taxon/list', taxon_controller.taxon_list);

// POST request for creating Taxon.
router.post('/taxon/create', taxon_controller.taxon_create_post);

// POST request to delete Taxon.
router.post('/taxon/:id/delete', taxon_controller.taxon_delete_post);

// POST request to update Taxon.
router.post('/taxon/:id/update', taxon_controller.taxon_update_post);

router.delete('/taxon/:id', taxon_controller.taxon_delete_post);

// GET request for one Taxon.
router.get('/taxon/:id', taxon_controller.taxon_detail);

module.exports = router;
