"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Routes = require('./routing/routes');
const logger = require('./middleware/logger');
const errHandler = require('./middleware/error-handler');

/**
 * @function bootstrapExpress
 * @returns {Express}
 * @description Bootstraps an express server.
 */
const bootstrapExpress = () => {
    let app = express();
    app.use(bodyParser.json());
    app.use(logger);

    let routeConfig = new Routes();
    routeConfig.config(app);
    
    app.use(methodOverride());
    app.use(errHandler);
    return app;
}

module.exports = bootstrapExpress;