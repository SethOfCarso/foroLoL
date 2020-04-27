'use strict';

const router = require('express').Router();
const ImageController = require("../controllers/image.controller");

router.route("/:filename")
    .get(
        ImageController.getImageById           // Middleware to get image given a file name
    );

module.exports = router;