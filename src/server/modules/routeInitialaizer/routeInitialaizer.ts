const express = require('express');
// import HTTP_STATUS_CODES from 'http-status-enum';

export function initializeRoutes(app){
    app.use('api/', apiRouter());
}

function apiRouter(){
    const router  = express.Router();

    return router;
}
