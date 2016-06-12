"use strict";
const express = require('express');
const routeDictionary = require('./routes.json').routes;
const routeFunctions = require('./route-functions');

/**
 * @class Routes
 * @description Handles the route configuration for the express server
 */
class Routes {
    constructor() {}

    /**
     * @public
     * @static
     * @method config
     * @param {Express} app
     * @description Bootstraps the routing components
     */
    config(app) {
        let router = express.Router();
        this._initStatic(app);
        this._initRoutes(router);

        app.use('/home', router);
    }

    /**
     * @private
     * @static
     * @method _initStatic
     * @param {Express} app
     * @description Bootstraps the static serving
     */
    _initStatic(app) {
        app.use('/static', express.static(`${__dirname}/../../static`));
    }

    /**
     * @private
     * @static
     * @method _initRoutes
     * @param {Express} app
     * @description Iterates over the values in the route dictionary and bootraps these routes
     */
    _initRoutes(app) {
        routeDictionary.forEach(r => {
            app[r.method](r.pattern, routeFunctions[r.handler]);
        });
    }
}

module.exports = Routes;