"use strict";
const zlib = require('zlib');
const fs = require('fs');

const inputPath = `${__dirname}/input/foo.txt`;
const zOutPath = `${__dirname}/output/foo.txt.gz`;
const rOutPath = `${__dirname}/output/foo.txt`;
const gzip = zlib.createGzip();
const unzip = zlib.createUnzip();

let input = fs.createReadStream(inputPath);
let output = fs.createWriteStream(zOutPath);

input.pipe(gzip).pipe(output);

output.on('close', () => {
    input = fs.createReadStream(zOutPath);
    output = fs.createWriteStream(rOutPath);

    input.pipe(unzip).pipe(output);
});