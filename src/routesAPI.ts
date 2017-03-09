// import {loginAPI, mustAuthenticateAPIMiddleware, logoutAPI} from "./api/auth/authentication";
import {PassportLocalStrategyMiddlewareFunctions} from "./server/modules/authenticationPassport";
const express = require('express');
import HTTP_STATUS_CODES from 'http-status-enum';

export const router = express.Router();

router.post('/login', PassportLocalStrategyMiddlewareFunctions.login);
router.all('/*', PassportLocalStrategyMiddlewareFunctions.mustAuthenticate);
router.post('/logout', PassportLocalStrategyMiddlewareFunctions.logout);
router.get('/test', (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});