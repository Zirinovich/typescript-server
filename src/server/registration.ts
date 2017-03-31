import Ioc from '../shared/classes/ioc';
import {PassportLocalStrategyMiddlewareFunctions} from './authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {UserStore} from './PostgreDatabase/UserStore';
import {DefaultSiteMiniClientApplication} from '../client/defaultSiteMini/defaultSiteMiniClientApplication';
//import {SiteAltLanClientApplication} from '../client/siteAltLan/siteAltLanClientApplication';

Ioc.register("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
Ioc.register("IUserStore", true, new UserStore());
Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());

export {Ioc};