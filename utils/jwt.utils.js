var jwt = require('jsonwebtoken');

var SECRET = process.env.SECRETKEY; //var avec la base mongo 'simplon_reunion_4p_dw-AB_IH_JFG'
SECRET = 'simplon_reunion_4p_dw-AB_IH_JFG'; // /!\ COMMENTER LORS DE LA MISE EN PROD, UNIQUEMENT POUR LES TESTS'



//export du module de la fonction ensure
module.exports = {
    ensureToken: function (req, res, next) {
        var tok = req.headers['x-access-token'];
        // console.log("tok = ", tok);
        // console.log("headers = ", req.headers["authorization"]);
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // Check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            // Next middleware
            next();
        } else {
            res.status(403).send("accès refusé");
        }
    },
    isAdmin: function (req, res, next) {
        jwt.verify(req.session.token, SECRET, function (err, data) {
            if (err) {
                res.status(403).send("Accès refusé");
            } else {
                if (data.role === 2) {
                   // console.log("droit ok");
                    req.body.role = data.role;
                    next();
                } else {
                    res.status(403).send("Vous n'avez pas les droits necessaire pour allez ici");
                }
            }
        });
    },
    isParticulier: function (req, res, next) {
        jwt.verify(req.session.token, SECRET, function (err, data) {
            if (err) {
                res.redirect("/particuliers/auth");
            } else {
                console.log("role =",req.session.user.role);
                if (data.role === 1) {
                   // console.log("droit ok");
                    req.body.role = data.role;
                    next();
                } else {
                    console.log("role =",req.session.user.role);
                    res.status(403).send("Vous n'avez pas les droits necessaire pour allez ici");
                }
            }
        });
    }
}