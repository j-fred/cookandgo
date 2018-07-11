var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require("../models/User");
//
var jwt = require('jsonwebtoken');

//var SECRET = process.env.SECRETKEY;//var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
var  SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'

module.exports = {
    //Liste les données
    login: function (req, res) {        
        User.findOne({
            'email': req.body.logemail
        }).exec(function (err, data) {
            bcrypt.compare(req.body.logpassword, data.password, function (err, result) {
                if (result === true) {
                    if (err) {
                        console.log('Error : ', err);
                    } else {
                       // console.log("data ok = > ",data);
                        var donnees = { email: data.email, role: data.role }
                        // then return a token, secret key should be an env variable
                        const token = jwt.sign(donnees, SECRET, { expiresIn: '24h' });                        
                        req.session.token = token;
                        req.session.user = { 
                            _id: data._id,
                            nom: data.nom,
                            prenom: data.prenom,
                            specialite: data.specialite,
                            email: data.email,
                            role: data.role
                        };

                        console.log("session.cuis ok = > ",req.session.user);
                        // res.render("ateliers/admin/liste", {
                        //     token: token
                        // });
                        res.redirect('/ateliers/admin/'+data._id);
                    }
                } else {
                  res.redirect('/cuisiniers/auth');
                }
            })           
        });
    },
    //Liste les données
    logout: function (req, res) {
        req.session.token   = " ";
        req.session.user    = " ";
        res.redirect('/ateliers');
        // res.render("ateliers/index", {
        //     title: 'User 974',
        //     datas: ["samsung", "iphone", "LG"]
        // });
    },
    //Liste les données
    list: function (req, res) {
        User.find({}).exec(function (err, datas) {
            if (err) {
                console.log('Error : ', err);
            } else {
                res.render("../views/cuisiniers/index", {
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
                res.render("../views/cuisiniers/show", {
                    data: data
                });
            }
        });
    },

    //redirection à la page de creation
    auth: function (req, res) {
        res.render("cuisiniers/login");
    },

    //enregistrement des données
    save: function (req, res) {
        var user = new User(req.body);

        user.save(function (err) {
            if (err) {
                console.log(err);
                res.render("../views/cuisiniers/login");
            } else {
                console.log("creation OK");
                res.redirect("/ateliers");
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
                res.render("../views/cuisiniers/edit", {
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
                res.render("../views/cuisiniers/edit", {
                    data: req.body
                });
            }
            res.redirect("/cuisiniers/show/" + data._id);

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
                res.render("../views/cuisiniers/edit", {
                    data: req.body
                });
            }
            res.redirect("/cuisiniers/show/" + data._id);

        });
    }
};