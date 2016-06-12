"use strict";
module.exports = (req, res, next) => {
    let logString = `${new Date().toISOString()}: ${req.method} ${req.path}`
    console.log(logString);
    next();
}