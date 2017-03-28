import Ioc from '../shared/classes/ioc';
import {PassportLocalStrategyMiddlewareFunctions} from './authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {UserStore} from './PostgeDatabase/UserStore';

Ioc.register("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
Ioc.register("IUserStore", true, new UserStore());

export {Ioc};