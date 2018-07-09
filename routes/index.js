var express = require('express');
var router = express.Router();

var data = require("../controllers/ateliersController");
/* GET home page. */
router.get('/', data.listaccueil);

module.exports = router;
