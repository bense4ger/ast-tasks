"use strict";
const mongoose = require('mongoose');
const Db = require('../data/db');
const schema = require('../data/schema');

class ThingService{
    constructor(){
        this._db = new Db();
        this._model = mongoose.model('Thing', schema);
    }

    insert(id, name){
        let newThing = new this._model({
            id: id,
            name: name
        });

        let insertPromise = new Promise((resolve, reject) => {
            newThing.save((err, newThing) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });

        return insertPromise;
    }

    get(id){
        let getPromise = new Promise((resolve, reject) => {
            this._model.find({ id: id }, (err, data) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(data);
                }
            });
        });

        return getPromise;
    }

    delete(id){
        let deletePromise = new Promise((resolve, reject) => {
            this._model.remove({id: id}, (err) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(true);
                }
            });
        });
        return deletePromise;
    }
}

module.exports = ThingService;