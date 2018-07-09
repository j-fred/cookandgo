var express = require('express');
var router = express.Router();

var data = require("../controllers/ateliersController");
var jwtC = require("../controllers/jwtController");

//recuperer les datas
router.get("/", data.listaccueil);
//recuperer les datas
router.get("/admin", jwtC.ensureToken, jwtC.verifAdmin, data.list);

//voir un data par son id
router.get("/show/:id", data.show);

//cree un data
router.get("/admin/create", jwtC.ensureToken, jwtC.verifAdmin, data.create);

//sauvegarder un data. /!\ cest un POST 
router.post("/admin/save", jwtC.ensureToken, jwtC.verifAdmin, data.save);

//editer un data
router.get("/admin/edit/:id", jwtC.ensureToken, jwtC.verifAdmin, data.edit);

//edit update.  /!\ cest un POST 
router.post("/admin/update/:id", jwtC.ensureToken, jwtC.verifAdmin, data.update);


//export du module router
module.exports = router;
