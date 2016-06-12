"use strict";
module.exports = (err, req, res, next) => {
    console.log(err.stack); //In real life this would log to a file or db
    res.sendStatus(500);
    res.end()
    next();
}