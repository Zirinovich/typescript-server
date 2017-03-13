import * as express from 'express';
import HTTP_STATUS_CODES from 'http-status-enum';
// import {PassportLocalStrategyMiddlewareFunctions} from '../authenticationPassport';
import Ioc from '../../shared/classes/ioc';
import {IAuthenticationMiddleware} from '../../shared/interfaces/authentication/IAuthenticationMiddleware';


export const apiRouter = express.Router();

// NOTE: Порядок маршрутов важен!
// apiRouter.post('/login', PassportLocalStrategyMiddlewareFunctions.login);
apiRouter.post('/login', (<IAuthenticationMiddleware>Ioc.resolve("IAuthenticationMiddleware")).login);

apiRouter.all('/*', (<IAuthenticationMiddleware>Ioc.resolve("IAuthenticationMiddleware")).mustAuthenticate); // все последующие маршруты требуют аутентификацию

apiRouter.post('/logout', (<IAuthenticationMiddleware>Ioc.resolve("IAuthenticationMiddleware")).logout);

apiRouter.get('/test', (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});
