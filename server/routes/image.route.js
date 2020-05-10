'use strict';

const router = require('express').Router();
const ImageController = require("../controllers/image.controller");
const AuthMiddleware = require('../middlewares/auth.middleware');

router.route("/:filename")
    .get(
        //AuthMiddleware.checkToken,
        ImageController.getImageById           // Middleware to get image given a file name
    );

module.exports = router;