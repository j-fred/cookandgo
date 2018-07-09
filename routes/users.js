var express = require('express');
var router = express.Router();

var data = require("../controllers/usersController");
var jwtC = require("../controllers/jwtController");

// Routes pour la vérification du login
router.post("/login", data.login);

// Routes pour deconnexion
router.get("/logout", data.logout);

//recuperer les datas
router.get("/", data.list);

//voir un data par son id
router.get("/show/:id", data.show);

//cree un data
router.get("/create", data.create);

//sauvegarder un data. /!\ cest un POST 
router.post("/save", data.save);

//editer un data
router.get("/edit/:id", data.edit);

//edit update.  /!\ cest un POST 
router.post("/update/:id", data.update);


//export du module router
module.exports = router;
