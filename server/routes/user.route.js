const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.route('/')
    .get(UserController.read);      // Add more middlewares if needed

router.route("/:id")
    .get(UserController.readById);  // Add more middlewares if needed

module.exports = router;