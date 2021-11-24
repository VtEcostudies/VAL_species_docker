var express = require('express');
var router = express.Router();

// Require controller modules.
var taxon_controller = require('../controllers/taxonController');

// GET taxon home page.
router.get('/', taxon_controller.index);
router.get('/taxa', taxon_controller.index);

// GET request for list of all Taxa.
router.get('/taxon/list', taxon_controller.taxon_list);

// GET request for creating a Taxon. NOTE This must come before routes that display Taxa (uses id).
router.get('/taxon/create', taxon_controller.taxon_create_get);

// POST request for creating Taxon.
router.post('/taxon/create', taxon_controller.taxon_create_post);

// GET request to delete Taxon.
router.get('/taxon/:id/delete', taxon_controller.taxon_delete_get);

// POST request to delete Taxon.
router.post('/taxon/:id/delete', taxon_controller.taxon_delete_post);

// GET request to update Taxon.
router.get('/taxon/:id/update', taxon_controller.taxon_update_get);

// POST request to update Taxon.
router.post('/taxon/:id/update', taxon_controller.taxon_update_post);

// GET request for one Taxon.
router.get('/taxon/:id', taxon_controller.taxon_detail);

/*
//initial test route
router.get('/list', (req,res) => {
  res.send('NOT Implemented yet.');
});
*/
module.exports = router;