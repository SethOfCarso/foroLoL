'use strict';

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

    async readByEmailUser(req, res) {
        let queryId = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};


        
        if(req.params.email !== undefined){
            queryId = String(req.params.email);
            const docs = await Post.getPostbyEmailUser(queryId, projection, options);
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
            res.status(201);
        }
        else{
            res.status(404);
        }

        res.json(writedPost);
    }

    async updatePost(req, res) {
        // Check for email in the url
        if (req.params.id) {
            const idPost = req.params.id;
            const query = { idPost };
            const data = req.body;
            const updatedPost = await Post.update(query, data);
            if (updatedPost) {
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({msg: 'Post no encontrado'});
            }
            
        } else {
            res.status(400).json({msg: 'Error en la petición de update'});
        }
    }

    async deletePost(req, res) {
        // Check for email in the url
        if (req.params.id) {
            const idPost = Number(req.params.id);
            const query = { idPost };
            const deletedPost = await Post.delete(query);
            if (deletedPost) {
                res.status(200).json(deletedPost);
            } else {
                res.status(404).json({msg: 'Post not found'});
            }
            
        } else {
            res.status(400).json({msg: 'Whoops -err- deleting'});
        }
    }

}

const postController = new PostController();
module.exports = postController;