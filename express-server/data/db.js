"use strict";
const mongoose = require('mongoose');

class Db{
    constructor(){
        let connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost/ast';
        mongoose.connect(connectionString);

        this._db = mongoose.connection;
        this._db.on('error', console.error.bind(console, 'Mongo Connection Error:'));
        this._db.once('open', () => { console.log('Mongo Connection Open'); });
    }

    
}

module.exports = Db;