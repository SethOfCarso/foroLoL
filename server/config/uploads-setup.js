"use strict";

const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary');
const config = require('./config');

// Cloudinary configuration
cloudinary.config({
    cloud_name: config.cloudinary_cloudName,
    api_key: config.cloudinary_apiKey,
    api_secret: config.cloudinary_apiSecret
});

// Auxiliary storage
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../temp'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname)); // Timestamp + extension
    } 
});

// File filters
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { 
        cb(null, true); 
    } else { 
        cb(null, false); // False, ignore other files 
    } 
}

// Multer instance
const imageConfiguration = multer({
    storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter
});

module.exports = imageConfiguration;