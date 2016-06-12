#!/usr/bin/env node
"use strict";
const prog = require('commander');

const PORT = process.env.PORT || 8080;
const listening = () => { console.log(`Listening on ${PORT}`); }

prog.version(require('../package.json').version)
    .option('-n', '--native', 'Use node http')
    .option('-e', '--express', 'Use express.js')
    .parse(process.argv);

if(prog.N){
    const httpServer = require('../http-server/server');
    httpServer.listen(PORT, listening);
}

if(prog.E){
    const expressServer = require('../express-server/server');
    expressServer().listen(PORT, listening);
}

if(!prog.N && !prog.E){
    console.log("Supply an option");
    console.log('run-server -h for help');
}