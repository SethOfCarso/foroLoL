'use strict';

const mongoose = require('mongoose');
const config = require('../config/config');
const url = config.dbUrl;

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Not connected to database", err);
});

module.exports = mongoose;