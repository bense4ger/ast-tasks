"use strict";
const fs = require('fs');

/**
 * @function process
 * @param {string} data
 * @returns {object}
 * @description Processes a string into an object
 */
const process = (data) => {
    let lines = data.split(/\r?\n/);
    let output = {};
    if(lines.length){
        let letterRegex = /\s([A-Z])\s/;
        let numberRegex = /\s(\d)/;

        lines.forEach((l) => {
            let letter = letterRegex.exec(l)[1];
            let number = parseInt(numberRegex.exec(l)[1]);

            if(output[letter]){
                output[letter] += number;
            }
            else{
                output[letter] = number;
            }
        });
    }

    return output;
}

/**
 * @function readData
 * @returns {Promise}
 * @description Reads data from a file
 */
const readData = () => {
    let readPromise = new Promise((resolve, reject) => {
        fs.readFile('./data.txt', 'utf8', (err, data) => {
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
    return readPromise;
}

/**
 * 'Main'
 * Reads the data from the file and processes.  
 * Outputs processed data to the console.
 */
readData()
    .then((data) => {
        let processed = process(data);
        console.log(processed);
    })
    .catch((err) => {
        console.log(err);
    });

