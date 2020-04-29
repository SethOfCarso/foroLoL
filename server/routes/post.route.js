'use strict';

const router = require('express').Router();
const PostController = require("../controllers/post.controller");

router.route('/')
    .get(PostController.readAllPosts)
    .post(PostController.writePost);      // Add more middlewares if needed

router.route("/:id/post/post")  // Add more middlewares if needed
    .get(PostController.readByIdPost).
    delete(PostController.deletePost).
    put(PostController.updatePost);
    
router.route("/:id/post/user")
    .get(PostController.readByIdUser);  // Add more middlewares if neede

router.route("/:title/post/title")
    .get(PostController.readByTitle);  // Add more middlewares if neede

// router.route("/:date/post/date").get(PostController.readByPostDate);  // Add more middlewares if neede

router.route("/:tags/post/tag")
    .get(PostController.readByTags);  // Add more middlewares if neede

module.exports = router;