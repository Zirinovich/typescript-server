import {loginAPI, mustAuthenticateAPIMiddleware, logoutAPI} from "./api/auth/authentication";
const express = require('express');
import HTTP_STATUS_CODES from 'http-status-enum';

export const router = express.Router();

router.post('/login', loginAPI);
router.all('/*', mustAuthenticateAPIMiddleware);
router.post('/logout', logoutAPI);
router.get('/test',(req, res)=>{
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});