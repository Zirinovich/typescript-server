import Ioc from '../shared/classes/ioc';
import {PassportLocalStrategyMiddlewareFunctions} from './authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {UserStore} from './PostgreDatabase/UserStore';
import {SiteAltLanClientApplication} from '../client/siteAltLan/siteAltLanClientApplication';
import {DefaultSiteMiniClientApplication} from "../client/defaultSiteMini/defaultSiteMiniClientApplication";
import {IsDefaultSiteMini} from "../shared/siteSwitcher";

Ioc.register("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
Ioc.register("IUserStore", true, new UserStore());
if(IsDefaultSiteMini) {
    Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());
} else {
    Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new SiteAltLanClientApplication());
}
export {Ioc};