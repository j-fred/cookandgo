var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
  
/**
 * Création du modèle pour la base de données pour la collections "voitures"
 */
var UserSchema = new mongoose.Schema({
    nom : {         type: String,   required: true    },
    prenom : {      type: String,   required: true    },
	email : {       type: String,   unique: true,        required: true    },
	password : {    type: String,   required: true    },
	phone : {   	type: String    },
	specialite : {  type: String    },
	role : {        type: Number,   default: 1    }
  });

//hashing du mot de passe a&vant de l'enregistrer dans la base de donnée
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

var User = mongoose.model('users', UserSchema);

module.exports = User;