var express = require('express');
var router = express.Router();

var data = require("../controllers/ateliersController");
/* GET home page. */
//router.get('/', data.listaccueil);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
