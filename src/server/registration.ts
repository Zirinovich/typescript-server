import Ioc from '../shared/classes/ioc';
import {PassportLocalStrategyMiddlewareFunctions} from './authenticationPassport/PassportLocalStrategyMiddlewareFunctions';
import {UserStore} from './PostgreDatabase/UserStore';

// if (typeof (require as any).ensure !== 'function') (require as any).ensure =
//     require('isomorphic-ensure')({
//
//         // If you want to use loaders, pass them through options:
//         // loaders: {
//         //     raw: require('raw-loader'),
//         //     json: require('json-loader'),
//         // },
//
//         // If you require local files, pass the current location:
//         dirname: __dirname,
//     });
//
//
// const appConfig = require('../../config/main');

Ioc.register("IAuthenticationMiddleware", true, new PassportLocalStrategyMiddlewareFunctions());
Ioc.register("IUserStore", true, new UserStore());
// if (appConfig.isDefaultSiteMini) {
//     (require as any).ensure(['../client/defaultSiteMini/defaultSiteMiniClientApplication'], () => {
//         const {DefaultSiteMiniClientApplication} = require('../client/defaultSiteMini/defaultSiteMiniClientApplication');
//         Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());
//     })
//
// } else {
//     (require as any).ensure(['../client/siteAltLan/siteAltLanClientApplication'], () => {
//         const {SiteAltLanClientApplication} = require('../client/siteAltLan/siteAltLanClientApplication');
//         Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new SiteAltLanClientApplication());
//     })
// }
