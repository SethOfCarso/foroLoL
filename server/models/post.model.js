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

    async getPostbyidPost(idPost){
        const idPost = { idPost };
        return await super.queryOne(idPost);
    }

    async getPostbyidUser(idUser){
        const idUser = { idUser };
        return await super.queryOne(idUser);
    }

    async getPostbyTitle(Title){
        const Title = { Title };
        return await super.queryOne(Title);
    }

    async getPostbyTags(tags){
        const tags = { tags };
        return await super.queryOne(tags);
    }

    async getPostbypostDate(date){
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