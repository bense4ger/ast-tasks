"use strict";
const respond = (res) => {
    console.log('waiting...');
    res.sendStatus(200);
    res.end();
}
module.exports = {
    callback: (res, cb) => {
        setTimeout(() => {
            respond(res);
            cb();
        }, 2000);
    },
    promise: (res) => {
        let responsePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                respond(res);
                resolve(true);
            }, 2000);
        });
        return responsePromise;
    }
}