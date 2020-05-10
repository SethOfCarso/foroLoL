'use strict';

const DataBaseWrapper = require('../db/DataBaseWrapper');
const mongoose = require('mongoose');

class Image extends DataBaseWrapper {
    constructor(){
        super();

        this._schema = new mongoose.Schema({
            id: {
                type: Number,
                unique: true
            },
            filename: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            registerDate: {
                type: Date,
                required: true
            },
            username: {
                type: String
            }
        });
        
        this._model = mongoose.model('images', this._schema);
    }

    async getImageByFilename(filename){
        const file = { filename };
        return await super.queryOne(file);
    }

    async createImage(id, filename, url, username){
        const newImage = {
            id,
            filename,
            url,
            registerDate: new Date(),
            username
        }

        return await super.add(newImage);
    }
}

let image = new Image();
module.exports = image;