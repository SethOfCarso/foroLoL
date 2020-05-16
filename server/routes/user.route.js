'use strict';

const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

router.route('/')
    .get(AuthMiddleware.checkToken, UserController.getUsers)      // Add more middlewares if needed
    .post(UserController.saveUser);

router.route("/:email")
    .get(AuthMiddleware.checkToken, UserController.getUserById)   // Add more middlewares if needed
    .put(AuthMiddleware.checkToken, UserController.updateUser)
    .delete(AuthMiddleware.checkToken, UserController.deleteUser);

router.route("/get/GetAll")
.get(UserController.getUsers)

module.exports = router;