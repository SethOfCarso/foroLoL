'use strict';

const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/config');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: config.passport_google_cliend_id,
    clientSecret: config.passport_google_client_secret,
    callbackURL: config.passport_google_callback_url
}, async function(accessToken, refreshToken, profile, done) {
    if (profile) {
        const email = profile._json.email;

        const query = { email };
        const user = await User.getUser(query);
        if (user) {
            done(null, user);
            return;
        } else {
            const newUser = {
                email: profile._json.email,
                username: 'Sin definir',
                password: 'Qom33p13',
                urlImage: 'default_profile.png',
                level: 0,
                favorites: [],
                posts: []
            };

            const insertedUser = await User.add(newUser); 
            if (insertedUser.error) {
                res.status(401).json({msg: 'Ya hay un usuario registrado con ese email'});
            } else {
                // Successful
                done(null, insertedUser);
            }
        }
    } else {
        // No error, No user, Message
        done(null, false, {msg: 'Error con la autenticación con Google'});
        return;
    }
}
));

function login(req, res) {
    passport.authenticate('google', async (error, user, info) => {
        if(user) {
            const token = jwt.sign({email: user.email}, config.passport_secretKey, {expiresIn: '1h'});
            
            const query = { email: user.email };
            const data = { token };
            await User.update(query, data);
            
            res.send({ token });
        } else {
            res.status(401).send({msg: 'Hubo un error en la autenticación con Google'});
        }
    })(req, res);
}

module.exports = {login};