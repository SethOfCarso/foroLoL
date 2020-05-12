'use strict';

const router = require('express').Router();
const passport = require('passport'); 
const passportLocal = require('../middlewares/passportLocal.middleware');
const passportGoogle = require('../middlewares/passportGoogle.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const UserController = require('../controllers/user.controller');

router.route('/login')
    .post(passportLocal.login);

router.route('/logout')
    .post(
        AuthMiddleware.checkToken,
        passportLocal.logout
    );

router.route('/signin')
    .post(
        UserController.registerUser,
        passportLocal.redirectLogin
    );

router.route('/google/login')
    .get(passport.authenticate('google', {scope:['profile', 'email']}));

router.route('/google/redirect')
    .get(passportGoogle.login);


module.exports = router;