'use strict';

const path = require('path');
const cloudinary = require('cloudinary');
const download = require('download');
const fs = require('fs-extra');
const Image = require("../models/image.model");

class ImageController{
    async getImageById(req, res){
        const filename = req.params.filename;
        
        if (filename) {
            if (filename == 'default_profile.png') {
                res.sendFile(path.join(__dirname, '../public/default_profile.png'));
            } else if (filename == 'chat_server.png') {
                res.sendFile(path.join(__dirname, '../public/chat_server.png'));
            } else if (filename == 'global.png') {
                res.sendFile(path.join(__dirname, '../public/global.png'));
            } else {
                const url = cloudinary.url(filename);

                await download(url, path.join(__dirname,'../temp/'));
                res.sendFile(path.join(__dirname, '../temp/' + filename));
            }
        }
    }

    async saveImage(req, res){
        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        
        // Delete file from this server
        await fs.unlink(req.file.path);
        
        // Save image in our database
        const timestamp = Date.now();
        const uploadedImage = await Image.createImage(
            timestamp, 
            result.public_id + "." + result.format,
            result.secure_url, 
            req.user.email
        );

        res.status(201).json(uploadedImage);
    }
}

const imageController = new ImageController();
module.exports = imageController;