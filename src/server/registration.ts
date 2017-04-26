import Ioc from '../shared/classes/ioc';
import {PassportLocalStrategyMiddlewareFunctions} from './_engine/middlewares/authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {UserStore} from './PostgreDatabase/UserStore';

Ioc.register("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
Ioc.register("IUserStore", true, new UserStore());
