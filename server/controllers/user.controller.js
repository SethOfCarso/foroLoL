'use strict';

const User = require('../models/user.model');

class UserController {
    async getUsers(req, res) {
        let query = {}          // Search by some criteria
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        
        // // Check for query params
        // if(Object.keys(req.query).length != 0){
        //     for(let queryParam in req.query){
        //         switch(queryParam){
        //             case "id":
        //                 query.uid = req.query.uid;
        //                 break;
        //             case "name":
        //                 query.username = req.query.username;
        //                 break;
        //             case "page":
        //                 options.page = req.query.page;
        //                 break;
        //             case "limit":
        //                 options.limit = req.query.limit;
        //                 break;
        //         }
        //     }
        // }

        const docs = await User.getUsers(query, projection, options);
        const users = JSON.parse(JSON.stringify(docs));

        res.json(users);
    }

    async getUserById(req, res) {
        let query = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedUser = {};

        // Check for email in the url
        if(req.params.email !== undefined){
            const email = req.params.email;
            const docs = await User.getUserById(email, projection, options);
            searchedUser = JSON.parse(JSON.stringify(docs));
            res.status(200);
        }
        else{
            res.status(404);
        }

        res.json(searchedUser);
    }

    async saveUser(req, res) {
        const newUser = await User.add(req.body); 
        if (newUser.error) {
            res.status(401).json({msg: 'Ya hay un usuario registrado con ese email'});
        } else {
            res.status(201).json(newUser);
        }
    }
}

const userController = new UserController();
module.exports = userController;