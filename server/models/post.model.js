"use strict";

const DataBaseWrapper = require('../db/DataBaseWrapper');
const mongoose = require('mongoose');

class Post extends DataBaseWrapper {
    constructor(){
        super();

        this._schema = new mongoose.Schema({
            id: {
                type: Number,
                unique: true
            },
            idPost: {
                type: Number,
                required: true
            },
            userId: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            postDate: {
                type: Date,
                required: true
            },
            tags: {
                type: Array
            },
            objtPost: {
                type: Array
            }
            
        });
        
        this._model = mongoose.model('posts', this._schema);
    }

    async getPosts(query = {}, projection = "", options = {}) {
        return await super.query(query, projection, options);
    }

    async getPostbyidPost(post2Search){
        const Postid = { post2Search };
        return await super.queryOne(Postid);
    }

    async getPostbyidUser(user2Search){
        const User = { user2Search };
        return await super.queryOne(User);
    }

    async getPostbyTitle(Title2search){
        const Title = { Title2search };
        return await super.queryOne(Title);
    }

    async getPostbyTags(tags2search){
        const tags = { tags2search };
        return await super.queryOne(tags);
    }

    async getPostbypostDate(date2search){
        const date = { date };
        return await super.queryOne(date);
    }

    async createPost(id, idPost, userId, url, title,content , tags,objtPost){
        const newPost = {
            id: id,
            idPost: idPost,
            userId: userId,
            url: url,
            title: title,
            content: content,
            postDate: new Date(),
            tags: tags,
            objtPost: objtPost,
        }

        return await super.add(newPost);
    }
}



let post = new Post();
module.exports = post;