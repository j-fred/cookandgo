var express = require('express');
var router = express.Router();
var path = require('path');
var data = require("../controllers/ateliersController");
var jwtU = require("../utils/jwt.utils");


//--------------------------------------------------------
//   GESTION DE L'UPLOAD DE L'IMAGE DANS LA PARTIE CREATION DE L'IMAGE ET L'ÉDITION
//--------------------------------------------------------

//appel de la librarie qui qui permet de copier les images dans un dossier
var multer  = require('multer');
var storage = multer.diskStorage({
  // ajout du chemin de destination
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../public/img/")
    },

  // création du nom du fichier => ici le même nom que celui d'origine
  // s'il n'est pas défini, choisi une suite de chiffre et lettre généré au hasard
    filename: function (req, file, cb) {
      //  console.log(file.mimetype);
      cb(null, file.originalname)
    }
  });
  var upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  });
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    var filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    var mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
//----------------------------------------------------------------------------

//recuperer les datas
router.get("/", data.listaccueil);

//voir un data par son id
router.get("/show/:id", data.show);

//cree un data
router.get("/admin/create", jwtU.isAdmin, data.create);

//sauvegarder un data. /!\ cest un POST 
router.post("/admin/save", jwtU.isAdmin,upload.single('file-image'), data.save);

//editer un data
router.get("/admin/edit/:id", jwtU.isAdmin, data.edit);

//edit update.  /!\ cest un POST 
router.post("/admin/update/:id", jwtU.isAdmin, upload.single('file-image'), data.update);

//recuperer les datas
router.get("/admin/:id", jwtU.isAdmin,  data.list);

//recuperer les datas
router.get("/reservation", data.reservation);

//recuperer les datas
router.post("/reservation/:id", jwtU.isParticulier,  data.push);


//export du module router
module.exports = router;
