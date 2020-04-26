"use strict";

const Post = require('../models/post.model');

class PostController {
    //Get all post
    async readAllPosts(req, res) {
        let query = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        
        // Check for query params
        if(Object.keys(req.query).length != 0){
            for(let queryParam in req.query){
                switch(queryParam){
                    case "id":
                        query.uid = req.query.uid;
                        break;
                    case "name":
                        query.username = req.query.username;
                        break;
                    case "page":
                        options.page = req.query.page;
                        break;
                    case "limit":
                        options.limit = req.query.limit;
                        break;
                }
            }
        }

        const docs = await Post.getPosts(query, projection, options);
        const posts = JSON.parse(JSON.stringify(docs));

        res.json(posts);
    }

    async readByIdPost(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};

        
        if(req.params.id !== undefined){
            queryId = Number(req.params.id);
            const docs = await Post.getPostbyidPost(queryId, projection, options);
            searchedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedPost);
    }

    async readByIdUser(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};

        
        if(req.params.id !== undefined){
            queryId = Number(req.params.id);
            const docs = await Post.getPostbyidUser(queryId, projection, options);
            searchedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedPost);
    }

    async readByTitle(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};

        
        if(req.params.title !== undefined){
            queryId = String(req.params.title);
            const docs = await Post.getPostbyTitle(queryId, projection, options);
            searchedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedPost);
    }

    async readByPostDate(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};

        
        if(req.params.date !== undefined){
            queryId = Date(req.params.date);
            const docs = await Post.getPostbypostDate(queryId, projection, options);
            searchedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedPost);
    }

    async readByTags(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};

        
        if(req.params.tags !== undefined){
            queryId = String(req.params.tags);
            const docs = await Post.getPostbyTags(queryId, projection, options);
            searchedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedPost);
    }

    async writePost(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let writedPost = {};
        
        if(req.body !== undefined){
            let body = req.body;
            const docs = await Post.createPost(body, projection, options);
            writedPost = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(writedPost);
    }

}

const postController = new PostController();
module.exports = postController;