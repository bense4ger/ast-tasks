"use strict";
const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});