import {PassportLocalStrategyMiddlewareFunctions} from "./";
import * as express from "express";
import HTTP_STATUS_CODES from 'http-status-enum';

export const apiRouter = express.Router();

// NOTE: Порядок маршрутов важен!
apiRouter.post('/login', PassportLocalStrategyMiddlewareFunctions.login);

apiRouter.all('/*', PassportLocalStrategyMiddlewareFunctions.mustAuthenticate); // все последующие маршруты требуют аутентификацию

apiRouter.post('/logout', PassportLocalStrategyMiddlewareFunctions.logout);

apiRouter.get('/test', (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});