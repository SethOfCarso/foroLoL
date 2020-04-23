"use strict";

const router = require('express').Router();
const ImageController = require("../controllers/image.controller");
const ImageConfiguration = require('../config/uploads-setup');

router.route("/")
    .post(
        ImageConfiguration.single('image'), // Middleware to upload image to this server
        ImageController.saveImage           // Middleware to upload image to cloudinary and save info in mongo
    );

module.exports = router;