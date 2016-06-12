"use strict";
const http = require('http');

const listener = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello, world!');
    res.end();
};


const server = http.createServer(listener);
module.exports = server;