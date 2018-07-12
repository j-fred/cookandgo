
var mongoose = require('mongoose');

var ParticulierSchema = new mongoose.Schema({
    nom : {
        type: String,
        required: true
    },
    prenom : {
        type: String,
        required: true
    },
	email : {
        type: String,
        unique: true,
        required: true
    },
	password : {
        type: String,
        required: true
    },
	telephone : {
        type: String
    }
});

module.exports = mongoose.model("particuliers", ParticulierSchema);