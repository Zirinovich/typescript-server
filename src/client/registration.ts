import Ioc from '../shared/classes/ioc';
const appConfig = require('../../config/main');
export function registrationApplication(callback) {
    if (appConfig.isDefaultSiteMini) {
        (require as any).ensure(['../client/defaultSiteMini/defaultSiteMiniClientApplication'], () => {
            const {DefaultSiteMiniClientApplication} = require('../client/defaultSiteMini/defaultSiteMiniClientApplication');
            Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());
            if(callback)
                callback();
        })

    } else {
        (require as any).ensure(['../client/siteAltLan/siteAltLanClientApplication'], () => {
            const {SiteAltLanClientApplication} = require('../client/siteAltLan/siteAltLanClientApplication');
            Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new SiteAltLanClientApplication());
            if(callback)
                callback();
        });
    }
}