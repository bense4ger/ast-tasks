"use strict";
const _ = require('underscore');
const ThingService = require('../services/thing-service');

const service = new ThingService();

/**
 * @description Simple in memory store of things
 */
const things = [
    { id: 1, name: 'Foo' },
    { id: 2, name: 'Bar' }
];

/**
 * @function newId
 * @returns { number }
 * @description returns the next id for new things
 */
const newId = () => {
    let max = _.max(things, (thing) => {
        return thing.id;
    });
    
    return max.id + 1; 
}

/**
 * @function idPresent
 * @param {Express.request} req
 * @returns {boolean}
 * @description determines whether the id parameter has been passed in a request
 */
const idPresent = (req) => {
    return req.params.id && parseInt(req.params.id);
}

/**
 * @function mongoSuccess
 * @param {Object} data
 * @param {Express.response} res
 * @description Simple helper which responds to a successful MongoDB request.
 */
const mongoSuccess = (data, res) => {
    res.type('json');
    res.send(data);
    res.end();
}

module.exports = {
    getHandler: (req, res, next) => {
        if(idPresent(req)){
            let thing = _.findWhere(things, { id: parseInt(req.params.id)});
            res.type('json');
            res.send(thing);
            res.end();
        }
        else{
            res.sendStatus(400);
        }
        next();
    },
    postHandler: (req, res, next) => {
        if(req.body.thing){
             let newThing = req.body.thing;
             newThing.id = newId();
             things.push(newThing);
             res.sendStatus(200);
             res.end();
        }
        next();
    },
    createHandler: (req, res, next) => {
        if(idPresent(req)){
            let newThing = {
                id: parseInt(req.params.id),
                name: 'default'
            }

            things.push(newThing);

            res.sendStatus(200);
            res.end();
        }
        else{
            res.sendStatus(400);
        }
        next();
    },
    updateHandler: (req, res, next) => {
        if(idPresent(req) && req.body.thing){
            var thing = _.findWhere(things, {id: parseInt(req.params.id)});
            if(thing){
                let index = _.indexOf(things, thing);
                things[index].name = req.body.thing.name;
                res.sendStatus(200);
                res.end();
            }
            else{
                res.sendStatus(404);
                res.end();
            }
        }
        else{
            res.sendStatus(400);
        }
        next();
    },
    errorHandler: (req, res, next) => {
        throw new Error('This will always happen');
    },
    mongoGet: (req, res, next) => {
        if(idPresent(req)){
            service.get(req.params.id)
                .then((data) => {
                    mongoSuccess(data, res);
                    res.next();

                })
                .catch((err) => {
                    throw err;
                });
        }
        else{
            res.sendStatus(400);
            res.end();
            next();
        }
    },
    mongoInsert: (req, res, next) => {
        if(req.body.thing){
            service.insert(req.body.thing.id, req.body.thing.name)
                .then((data) => {
                    mongoSuccess(data, res);
                    res.next();
                })
                .catch((err) => {
                    throw err;
                });
        }
        else{
            res.sendStatus(400);
            res.end();
            next();
        }
    },
    mongoDelete: (req, res, next) => {
        if(idPresent(req)){
            service.delete(req.params.id)
                .then((data) => {
                    mongoSuccess(data, res);
                    res.next();
                })
                .catch((err) => {
                    throw err;
                });
        }
    }
}