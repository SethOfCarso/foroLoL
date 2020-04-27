'use strict';

const mongoose = require('../db/mongodb-connection')
const DataBaseWrapper = require('../db/DataBaseWrapper');

class User extends DataBaseWrapper {
    //_schema;

    constructor() {
        super();
        
        this._schema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                unique: true
            },
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            lolAccount: {
                type: String
            },
            urlImage: {
                type: String
            },
            level: {
                type: Number,
                required: true
            },
            favorites: {
                type: Array
            },
            posts: {
                type: Array
            },
            token: {
                type: String
            }
        });
        
        this._model = mongoose.model('users', this._schema);
    }
    
    async getUsers(query = {}, projection = "", options = {}) {
        return await super.query(query, projection, options);
    }
    
    async getUserById(email, projection = "", options = {}) {
        const userEmail = { email }
        return await super.queryOne(userEmail, projection, options);
    }

    async getUser(query = {}, projection = "", options = {}) {
        return await super.queryOne(query, projection, options);
    }
    
    async exists(conditions) {
        return await super.exists(conditions);
    }

    async add(document) {
        return await super.add(document);
    }

    async update(query, data) {
        return await super.update(query, data);
    }

    async delete(query) {
        return await super.delete(query);
    }
}
const user = new User();
// let info = {
//     email: 'eGasparArellano@gmail.com',
//     username: 'EliasGaspar',
//     password: '123',
//     lolAccount: 'Hillsong',
//     urlImage: 'https://vignette.wikia.nocookie.net/leagueoflegendsoficial/images/e/e5/Teemo_8.jpg/revision/latest/top-crop/width/220/height/220?cb=20170326185212&path-prefix=es',
//     level: 2,
//     favorites: ['Post 1', 'Post 2'],
//     posts: ['My post 1', 'My post 2', 'My post 3']
// };

//user.add(info).then((value) => console.log(value));
//user.getUserById(1000).then((value) => console.log(value));

module.exports = user;