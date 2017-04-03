// import {IClientApplication} from '../shared/interfaces/common/IClientApplication';
// import {IDefaultSiteReduxStore} from '../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
if (typeof (require as any).ensure !== 'function') (require as any).ensure =
    require('isomorphic-ensure')({

        // If you want to use loaders, pass them through options:
        // loaders: {
        //     raw: require('raw-loader'),
        //     json: require('json-loader'),
        // },

        // If you require local files, pass the current location:
        dirname: __dirname,
    });

const appConfig = require('../../config/main');
let clientApplication;
if (appConfig.isDefaultSiteMini) {
    (require as any).ensure(['../client/defaultSiteMini/defaultSiteMiniClientApplication'], () => {
        const {DefaultSiteMiniClientApplication} = require('../client/defaultSiteMini/defaultSiteMiniClientApplication');
        clientApplication = new DefaultSiteMiniClientApplication();
    });
}
else {
    (require as any).ensure(['../client/siteAltLan/siteAltLanClientApplication'], () => {
        const {SiteAltLanClientApplication} = require('../client/siteAltLan/siteAltLanClientApplication');
        clientApplication = new SiteAltLanClientApplication();
    })
}
// const clientApplication = Ioc.resolve<IClientApplication<IDefaultSiteReduxStore>>('IClientApplication/IDefaultSiteReduxStore/');
export {clientApplication};