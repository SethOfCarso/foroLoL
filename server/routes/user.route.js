"use strict";

const router = require('express').Router();
const UserController = require("../controllers/user.controller");

router.route('/')
    .get(UserController.getUsers);      // Add more middlewares if needed

router.route("/:email")
    .get(UserController.getUserById);  // Add more middlewares if needed

module.exports = router;