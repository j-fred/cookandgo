var mongoose = require('mongoose');

var AtelierSchema = new mongoose.Schema({
	titre: {			type: String,	required: true	},
	description: {  	type: String,	required: true    },
	date: {        		type: Date,		required: true    },
	horaire: {			type: String,	required: true    },
	duree: {        	type: Number,	required: true    },
	places_disponible: {type: Number,	required: true    },
	places_reservees: {	type: Number,	required: true    },
	prix: {				type: Number,	required: true    },
	image: {        	type: String,	required: true    },
	actif: {        	type: String,	required: true,	default: " "    },
	_cuisinier: {		type: mongoose.Schema.Types.ObjectId,	ref: 'users'	},
	_particuliers: [{	type: mongoose.Schema.Types.ObjectId,	ref: 'users'	}]
});

module.exports = mongoose.model("ateliers", AtelierSchema);