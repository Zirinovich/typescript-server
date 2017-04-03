import Ioc from '../shared/classes/ioc';
const appConfig = require('../../config/main');

if (appConfig.isDefaultSiteMini) {
    (require as any).ensure([], () => {
        const {DefaultSiteMiniClientApplication} = require('../client/defaultSiteMini/defaultSiteMiniClientApplication');
        Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());
    })

} else {
    (require as any).ensure([], () => {
        const {SiteAltLanClientApplication} = require('../client/siteAltLan/siteAltLanClientApplication');
        Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new SiteAltLanClientApplication());
    });
}