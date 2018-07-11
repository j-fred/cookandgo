var mongoose = require('mongoose');

var Atelier = require("../models/Atelier");

var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRETKEY;//var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
    SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'

module.exports = {
    //Liste les données dans la page index
    listindex : function(req, res) {
        if(!req.session.user){
            // initialisation des données de sessions
            req.session.user = { 
                _id:" ",
                nom:" ",
                prenom: " ",
                email: " "
            };
        }
        Atelier.find({actif:{ $eq: "on" }}).exec(function(err, datas){
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("../views/index",{ title: 'Cook and Go', datas:datas,
                user:req.session.user  } );
            } 
        });
    },

    //Liste les données dans la page atelier
    listaccueil : function(req, res) {
        if(!req.session.user){
            // initialisation des données de sessions
            req.session.user = { 
                _id:" ",
                nom:" ",
                prenom: " ",
                email: " "
            };
        }
        Atelier.find({actif:{ $eq: "on" }}).populate({path:"_cuisinier", populate: { path:"users"}}).exec(function(err, datas){
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("../views/ateliers/index",{ title: 'Cook and Go', datas:datas,
                user:req.session.user  } );
            } 
        });
    },

    //Liste les données
    list : function(req, res) {
        // var objID = new ObjectID(req.params.id);
        Atelier.find({_cuisinier: req.params.id}).exec(function(err, datas){
            // console.log("--------",req.params.id);
            // console.log("========",datas);
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("../views/ateliers/admin/liste",{ 
                    title: 'Cook and Go', 
                    datas:datas,
                    user:req.session.user 
                });
            } 
        });
    },

    //Affiche la donnée par son id
    show : function(req, res) {
        Atelier.findOne({_id:req.params.id}).exec(function(err, data){
            if(err){
                console.log('Error : ', err);
            }else{
                res.render("ateliers/show",{data:data});
            } 
        });
    },

    //redirection à la page de creation
    create : function(req, res){  
        Atelier.findOne({_id:req.params.id})
            .populate('users')
            .exec(function(err, data){
            if(err){
                console.log('Error : ', err);
            }else{
                console.log('my data :=================== ', data);
                res.render("ateliers/admin/create",{
                    data:data,
                    user:req.session.user
                });
            } 
        });
       console.log("ateliers/admin/create")   ;
        // res.render("ateliers/admin/create",{ uid:req.params.id});
        // res.redirect("/ateliers/admin/create/"+req.params.id);
        // res.json({
        //     description: 'Protected information. Congrats!',
        //     data:req.body,
        //     token:req.token
        // })  
    },

    //enregistrement des données
    save: function(req, res){
        var atelier = new Atelier(req.body);

        atelier.save(function(err){
            if(err){
                console.log(err);
                res.render("../views/ateliers/admin/create/");
            } else{
                console.log("creation OK");
                res.redirect('/ateliers/admin/'+data._id);
            } 
        });
    },

    //edition de la donnée par son id
    edit : function(req, res){
        var atelier = new Atelier(req.body);

        Atelier.findOne({_id:req.params.id}).exec(function(err, data){
            if(err){
                console.log("Error ", err);
            } else{
               // console.log("page edit ==>",req.session.user);
                res.render("ateliers/admin/edit",{ 
                    data:data,
                    user:req.session.user
                } );
            } 
        });
    },

    //gestion de l'edition de la donnée
    update : function(req, res){
        var dataAtelier ={
            titre: req.body.titre, 
            description: req.body.description,
            date: req.body.date,
            horaire: req.body.horaire,
            duree: req.body.duree,
            places_disponible: req.body.places_disponible,
            places_reservees: req.body.places_reservees,
            prix: req.body.prix,
            image: req.body.image,
            actif: req.body.actif,
            _cuisinier: req.body._cuisinier
        }
        Atelier.findByIdAndUpdate(req.params.id,{ $set :dataAtelier },{new: true}, function (err, data){
            if (err){
                console.log(err);
                res.render("../views/ateliers/edit",{data:req.body} );
            } 
            console.log("update ok ==", data);
            res.redirect('/ateliers/admin/'+req.session.user._id);
            
        });
    },

    reservation : function(req, res) {
        res.render("ateliers/reservation",{ 
            title: 'Cook and Go',   
            user:req.session.user
        });
    },

    //gestion de l'edition de la donnée
    push : function(req, res){ 
        Atelier.findOne({_id:req.params.id}).exec(function(err, data){
                var reservees = data._particuliers.length;
      //  Atelier.findByIdAndUpdate(req.params.id,{ $set :{nom: req.body.nom, prix: req.body.prix}, "$push": { dim:  req.body._id }  },{new: true}, function (err, data){
            Atelier.findByIdAndUpdate(data.id,{ $set :{places_reservees:reservees+1}, "$push": { _particuliers: req.session.user._id }  },{new: true}, function (err, data){
                if (err){
                    console.log(err);
                    res.render("ateliers/index",{data:req.body} );
                } 
                console.log("push ok ==", data);
                res.redirect("/ateliers/reservation");
            }); 
        });
    }
};