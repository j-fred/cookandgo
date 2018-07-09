var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require("../models/User");

var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRETKEY;//var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
    SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'

module.exports = {
    //Liste les données
    login: function (req, res) {        
        console.log("req = > ",req.body);
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).exec(function (err, data) {
            bcrypt.compare(req.body.password, data.password, function (err, result) {
                if (result === true) {
                    if (err) {
                        console.log('Error : ', err);
                    } else {
                        console.log("data = > ",data);
                        var donnees = { email: data.email, droit: data.droit }
                        // then return a token, secret key should be an env variable
                        const token = jwt.sign(donnees, SECRET, { expiresIn: '30s' });
                        // res.json({
                        //     message: 'Authenticated! Use this token in the "Authorization" header',
                        //     token: token
                        // });
                        res.render("../views/ateliers/admin/create", {
                            title: 'User 974'
                        });
                    }
                } else {
                  res.redirect('/particuliers/auth');
                }
            })           
        });
    },
    //Liste les données
    logout: function (req, res) {
        User.find({}).exec(function (err, datas) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("/particuliers/index", {
                    title: 'User 974',
                    datas: ["samsung", "iphone", "LG"]
                });
            }
        });
    },
    //Liste les données
    list: function (req, res) {
        User.find({}).exec(function (err, datas) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/particuliers/index", {
                    title: 'User 974',
                    datas: ["samsung", "iphone", "LG"]
                });
            }
        });
    },

    //Affiche la donnée par son id
    show: function (req, res) {
        User.findOne({
            _id: req.params.id
        }).exec(function (err, data) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/particuliers/show", {
                    data: data
                });
            }
        });
    },

    //redirection à la page de creation
    auth: function (req, res) {
        res.render("../views/particuliers/login");
    },

    //enregistrement des données
    save: function (req, res) {
        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                console.log(err);
                res.redirect("/particuliers/auth");
            } else {
                console.log("creation OK");
                res.render("../views/ateliers/admin/index");
            }
        });
    },

    //edition de la donnée par son id
    edit: function (req, res) {
        var user = new User(req.body);

        User.findOne({
            _id: req.params.id
        }).exec(function (err, data) {
            if (err) {
                console.log("Error ", err);
            } else {
                res.render("../views/particuliers/edit", {
                    data: data
                });
            }
        });
    },

    //gestion de l'edition de la donnée
    update: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            $set: {
                nom: req.body.nom,
                prix: req.body.prix
            }
        }, {
            new: true
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.render("../views/particuliers/edit", {
                    data: req.body
                });
            }
            res.redirect("/particuliers/show/" + data._id);

        });
    },

    //gestion de l'edition de la donnée
    push: function (req, res) {
        User.findByIdAndUpdate(req.params.id, {
            $set: {
                nom: req.body.nom,
                prix: req.body.prix
            },
            "$push": {
                dim: req.body._id
            }
        }, {
            new: true
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.render("../views/particuliers/edit", {
                    data: req.body
                });
            }
            res.redirect("/particuliers/show/" + data._id);

        });
    }
};