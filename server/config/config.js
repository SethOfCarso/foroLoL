'use strict';
let mongo_dbName = '';

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
    mongo_dbName = process.env.DB_NAME_DEV;
} else {
    mongo_dbName = process.env.DB_NAME_PROD;
}
     

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',
    mongo_dbUser: process.env.DB_USER,
    mongo_dbPassword: process.env.DB_PASSWORD,
    mongo_dbName,
    mongo_dbCluster: process.env.DB_CLUSTER,
    cloudinary_cloudName: process.env.CD_CLOUD_NAME,
    cloudinary_apiKey: process.env.CD_API_KEY,
    cloudinary_apiSecret: process.env.CD_API_SECRET,
    passport_secretKey: process.env.PSSPRT_SECRET_KEY,
    passport_google_cliend_id: process.env.PSSPRT_GOOGLE_CLIENT_ID,
    passport_google_client_secret: process.env.PSSPRT_GOOGLE_CLIENT_SECRET,
    passport_google_callback_url: process.env.PSSPRT_GOOGLE_CALLBACK_URL,
    api_lol_token: process.env.API_LOL_TOKEN,
    api_lol_base_url: process.env.API_LOL_BASE_URL,
    api_lol_endpoint_summoner: process.env.API_LOL_ENDPOINT_SUMMONER,
    api_lol_endpoint_matches: process.env.API_LOL_ENDPOINT_MATCHES,
    api_lol_endpoint_match_detail: process.env.API_LOL_ENDPOINT_MATCH_DETAIL,
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