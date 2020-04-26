'use strict';

if (process.env.NODE_ENV != 'production') 
     require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',
    mongo_dbUser: process.env.DB_USER,
    mongo_dbPassword: process.env.DB_PASSWORD,
    mongo_dbName: process.env.DB_NAME,
    mongo_dbCluster: process.env.DB_CLUSTER,
    cloudinary_cloudName: process.env.CD_CLOUD_NAME,
    cloudinary_apiKey: process.env.CD_API_KEY,
    cloudinary_apiSecret: process.env.CD_API_SECRET,
    passport_secretKey: process.env.PSSPRT_SECRET_KEY,
    get dbUrl() {
        return `mongodb+srv://${this.mongo_dbUser}:${this.mongo_dbPassword}@${this.mongo_dbCluster}.mongodb.net/${this.mongo_dbName}?retryWrites=true&w=majority`
    }, 
    // If it is required something more specific for the environment 
    production: { 
        // Production config
    }, 
    development: { 
        // Development config
    } 
};