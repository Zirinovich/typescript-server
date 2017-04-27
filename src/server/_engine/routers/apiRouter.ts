import * as express from 'express';
import HTTP_STATUS_CODES from 'http-status-enum';
import Ioc from '../../shared/classes/ioc';
import {IAuthenticationMiddleware} from '../../shared/ajaxDto/authentication/IAuthenticationMiddleware';
import {router as apiRouterPublic} from './apiRouterPublic';

export const apiRouter = express.Router();
const authenticationMiddleware = Ioc.resolve<IAuthenticationMiddleware>("IAuthenticationMiddleware");
// NOTE: Порядок маршрутов важен!
apiRouter.use('/public', apiRouterPublic);
apiRouter.post('/login', authenticationMiddleware.login);
apiRouter.all('/*', authenticationMiddleware.mustAuthenticate); // все последующие маршруты требуют аутентификацию
apiRouter.post('/logout', authenticationMiddleware.logout);
apiRouter.get('/test', (req, res) => {
    res.status(HTTP_STATUS_CODES.OK).json(req.user);
});
