'use strict';

const router = require('express').Router();
const passportLocal = require('../middlewares/passportLocal.middleware');
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


module.exports = router;