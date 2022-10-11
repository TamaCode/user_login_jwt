const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'testing secret string', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'testing secret string', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null; // Paso data del server a las views
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; // Paso data del server a las views
                next();
            }
        });

    } else {
        res.locals.user = null; // Paso data del server a las views
        next();
    }
};

module.exports =  {requireAuth, checkUser} 