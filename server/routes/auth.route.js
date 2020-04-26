"use strict";

const router = require('express').Router();
const passportLocal = require('../middlewares/passportLocal.middleware');

router.route('/')
    .post(passportLocal.login);


module.exports = router;