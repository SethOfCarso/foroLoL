"use strict";

const User = require('../models/user.model');

class UserController {
    async read(req, res) {
        let query = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        
        // Check for query params
        if(Object.keys(req.query).length != 0){
            for(let queryParam in req.query){
                switch(queryParam){
                    case "uid":
                        query.uid = req.query.uid;
                        break;
                    case "name":
                        query.username = req.query.username;
                        break;
                    case "page":
                        options.page = req.query.page;
                        break;
                    case "limit":
                        options.limit = req.query.limit;
                        break;
                }
            }
        }

        const docs = await User.getUsers(query, projection, options);
        const users = JSON.parse(JSON.stringify(docs));

        res.json(users);
    }

    async readById(req, res) {
        let queryUid = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedUser = {};

        // Check for uid in the url
        if(req.params.id !== undefined){
            queryUid = Number(req.params.id);
            const docs = await User.getUserById(queryUid, projection, options);
            searchedUser = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedUser);
    }
}

const userController = new UserController();
module.exports = userController;