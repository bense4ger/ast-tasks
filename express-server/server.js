"use strict";
const express = require('express');
const Routes = require('./routing/routes');
/**
 * @function bootstrapExpress
 * @returns {Express}
 * @description Bootstraps an express server.
 */
const bootstrapExpress = () => {
    let app = express();

    let routeConfig = new Routes();
    routeConfig.config(app);
    
    return app;
}

module.exports = bootstrapExpress;