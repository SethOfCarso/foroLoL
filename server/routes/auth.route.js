'use strict';

const router = require('express').Router();
const passportLocal = require('../middlewares/passportLocal.middleware');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.route('/login')
    .post(passportLocal.login);

router.route('/logout')
    .post(
        AuthMiddleware.checkToken,
        passportLocal.logout
    );


module.exports = router;