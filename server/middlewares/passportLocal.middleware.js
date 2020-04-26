const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/config');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function(email, password, done) {
    const query = { email, password };
    let user = await User.getUser(query);
    if (user) {
        done(null, user);
    } else {
        done(null, false, {error: 'Usuario no encontrado'});
    }
}));

function login(req, res) {
    passport.authenticate('local', (error, user, info) => {
        if(user) {
            const token = jwt.sign({email: user.email}, config.passport_secretKey, {expiresIn: '1h'});
            res.send({ token });
        } else {
            res.status(401).send(info);
        }
    })(req, res);
}

module.exports = { login };