'use strict';

class DataBaseWrapper {
    //_model;

    constructor() {
        this._model = null;
    }

    async query(query, projection = {}, options = {}) {
        return await this._model.find(query, projection, options);
    }

    async queryOne(query, projection = {}, options = {}) {
        return await this._model.findOne(query, projection, options);
    }

    async queryLike(query, projection = {}, options = {}) {
        return await this._model.find(query, projection, options);
    }

    async update(query, dataObject) {
        return await this._model.findOneAndUpdate(query, {
            $set: dataObject
        }, {
            new: true
        })
    }

    async delete(query, options = {}) {
        return await this._model.findOneAndDelete(query, options)
    }

    async exists(query) {
        return await this._model.exists(query);
    }

    async add(document) {
        try{
            const newDocument = this._model(document);
            return await newDocument.save();
        } catch(e) {
            return {error: e.errmsg};
        }
    }
}

module.exports = DataBaseWrapper;
