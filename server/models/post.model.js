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
                unique: true,
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
        const Postid = { idPost };
        console.log("En modelo");
        console.log(Postid);
        return await super.queryOne(Postid);
    }

    async getPostbyidUser(userId){
        const User = { userId };
        return await super.queryOne(User);
    }

    async getPostbyTitle(title){
        const Title = { title };
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

    // async createPost(id, idPost, userId, url, title,content , tags,objtPost){
    async createPost(body, projection, options){
        
        const newPost = {
            id: body.id,
            idPost: body.idPost,
            userId: body.userId,
            url: body.url,
            title: body.title,
            content: body.content,
            postDate: new Date(),
            tags: body.tags,
            objtPost: body.objtPost,
        }

        return await super.add(newPost);
    }
}



let post = new Post();
module.exports = post;