"use strict"

const router = require('express').Router();
const PostController = require("../controllers/post.controller");

router.route('/')
    .get(PostController.readAllPosts);      // Add more middlewares if needed

router.route("/:id/post/post")
    .get(PostController.readByIdPost);  // Add more middlewares if needed
    
router.route("/:id/post/user")
    .get(PostController.readByIdUser);  // Add more middlewares if neede

router.route("/:title/post/title")
    .get(PostController.readByTitle);  // Add more middlewares if neede

router.route("/:date/post/date")
    .get(PostController.readByPostDate);  // Add more middlewares if neede

router.route("/:tags/post/user")
    .get(PostController.readByTags);  // Add more middlewares if neede

module.exports = router;