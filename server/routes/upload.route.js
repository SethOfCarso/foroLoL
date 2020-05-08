'use strict';

const router = require('express').Router();
const ImageController = require("../controllers/image.controller");
const ImageConfiguration = require('../config/uploads-setup');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.route("/")
    .post(
        AuthMiddleware.checkToken,
        ImageConfiguration.single('image'), // Middleware to upload image to this server
        ImageController.saveImage           // Middleware to upload image to cloudinary and save info in mongo
    );

module.exports = router;