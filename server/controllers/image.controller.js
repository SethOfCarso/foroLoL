"use strict";

const path = require('path');
const cloudinary = require('cloudinary');
const download = require('download');
const fs = require('fs-extra');
const Image = require("../models/image.model");

class ImageController{
    async getImageById(req, res){
        const filename = req.params.filename;
        const url = cloudinary.url(filename);

        await download(url, path.join(__dirname,'../temp/'));
        res.sendFile(path.join(__dirname, '../temp/' + filename));
    }

    async saveImage(req, res){
        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        
        // Delete file from this server
        await fs.unlink(req.file.path);
        
        // Save image in our database
        const timestamp = Date.now();
        await Image.createImage(
            timestamp, 
            result.public_id + "." + result.format,
            result.secure_url, 
            'eGasparArellano@gmail.com' // TODO implement authentication and put here the user ID
        );
        
        res.status(201).send({msg: 'File uploaded'});
    }
}

const imageController = new ImageController();
module.exports = imageController;