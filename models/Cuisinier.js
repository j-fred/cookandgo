
var mongoose = require('mongoose');

var CuisinierSchema = new mongoose.Schema({
	nom : {			type: String,        required: true    },
    prenom : {		type: String,        required: true    },
	email : {		type: String,        unique: true,        required: true    },
	password : {	type: String,        required: true    },
	specialite : {	type: String    }
});

module.exports = mongoose.model("cuisiniers", CuisinierSchema);