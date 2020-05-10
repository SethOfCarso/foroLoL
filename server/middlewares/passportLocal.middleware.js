'use strict';

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
    const user = await User.getUser(query);
    if (user) {
        done(null, user);
    } else {
        done(null, false, {msg: 'Usuario no encontrado'});
    }
}));

function login(req, res) {
    passport.authenticate('local', async (error, user, info) => {
        if(user) {
            const token = jwt.sign({email: user.email}, config.passport_secretKey, {expiresIn: '1h'});
            
            const query = { email: user.email };
            const data = { token };
            await User.update(query, data);
            
            res.send({ token });
        } else {
            res.status(401).send(info);
        }
    })(req, res);
}

async function logout(req, res) {
        const query = { email: req.user.email };
        const data = { token: '' };
        const response = await User.update(query, data);
        if(response) {
            res.status(200).send();
        } else {
            res.status(404).send();
        }
        
}

module.exports = { login, logout };