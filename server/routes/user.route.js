'use strict';

const router = require('express').Router();
const UserController = require("../controllers/user.controller");

router.route('/')
    .get(UserController.getUsers)      // Add more middlewares if needed
    .post(UserController.saveUser);

router.route("/:email")
    .get(UserController.getUserById)   // Add more middlewares if needed
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

module.exports = router;