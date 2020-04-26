'use strict';

const router = require('express').Router();
const lolController = require("../controllers/lolApi.controller");

// Por el momento todos los que se utilizaran sera para LAN
router.route('/:Summoner')
    .get(lolController.getSummoner);


module.exports = router;