"use strict";

const mongoose = require('../db/mongodb-connection')
const DataBaseWrapper = require('../db/DataBaseWrapper');

class User extends DataBaseWrapper {
    //_schema;

    constructor() {
        super();
        
        this._schema = new mongoose.Schema({
            uid: {
                type: Number,
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
            email: {
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
                type: Array,
                required: true
            },
            posts: {
                type: Array
            }
        });
        
        this._model = mongoose.model('users', this._schema);
    }
    
    async getUsers(query = {}, projection = "", options = {}) {
        return await super.query(query, projection, options);
    }
    
    async getUserById(uid, projection = "", options = {}) {
        return await super.queryOne({uid : uid}, projection, options);
    }
    
    async exists(conditions) {
        return await super.exists(conditions);
    }

    async add(document){
        return super.add(document);
    }
}
const user = new User();
// let info = {
//     uid: '1000',
//     username: 'EliasGaspar',
//     password: '123',
//     email: 'eGasparArellano@gmail.com',
//     lolAccount: 'Hillsong',
//     urlImage: 'https://vignette.wikia.nocookie.net/leagueoflegendsoficial/images/e/e5/Teemo_8.jpg/revision/latest/top-crop/width/220/height/220?cb=20170326185212&path-prefix=es',
//     level: 2,
//     favorites: ['Post 1', 'Post 2'],
//     posts: ['My post 1', 'My post 2', 'My post 3']
// };

//user.add(info);
//user.getUserById(1000).then((value) => console.log(value));

module.exports = user;