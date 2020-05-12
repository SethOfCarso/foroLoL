'use strict';

const User = require('../models/user.model');

class UserController {
    async getUsers(req, res) {
        let query = {}          // Search by some criteria
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        
        // Check for query params
        if(Object.keys(req.query).length != 0){
            for(let queryParam in req.query){
                switch(queryParam){
                    case "username":
                        query.username = req.query.username;
                        break;
                    // case "name":
                    //     query.username = req.query.username;
                    //     break;
                    // case "page":
                    //     options.page = req.query.page;
                    //     break;
                    // case "limit":
                    //     options.limit = req.query.limit;
                    //     break;
                }
            }
        }

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

    async registerUser(req, res, next) {
        let newUser = await User.add(req.body); 
        if (newUser.error) {
            res.status(401).json({msg: 'Ya hay un usuario registrado con ese email'});
        } else {
            req.user = newUser;
            next();
        }
    }

    async updateUser(req, res) {
        // Check for email in the url
        if (req.params.email) {
            const email = req.params.email;
            const query = { email };
            const data = req.body;
            
            const updatedUser = await User.update(query, data);

            if (updatedUser) {
                if(updatedUser.error) {
                    if(updatedUser.error.includes('duplicate key')) {
                        res.status(401).json({msg: 'Ya hay un usuario registrado con ese email'});
                    } else {
                        res.status(500).json({msg: 'Hubo un error en la actualización'});
                    }
                } else {
                    res.status(200).json(updatedUser);
                }
            } else {
                res.status(404).json({msg: 'Usuario no encontrado'});
            }
        } else {
            res.status(400).json({msg: 'Error en la petición'});
        }
    }

    async deleteUser(req, res) {
        // Check for email in the url
        if (req.params.email) {
            const email = req.params.email;
            const query = { email };
            
            const deletedUser = await User.delete(query);
            if (deletedUser) {
                res.status(200).json(deletedUser);
            } else {
                res.status(404).json({msg: 'Usuario no encontrado'});
            }
            
        } else {
            res.status(400).json({msg: 'Error en la petición'});
        }
    }
}

const userController = new UserController();
module.exports = userController;