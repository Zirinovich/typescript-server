import Ioc from '../shared/classes/ioc';
// import {DefaultSiteMiniClientApplication} from './defaultSiteMini/defaultSiteMiniClientApplication';
import {SiteAltLanClientApplication} from './siteAltLan/siteAltLanClientApplication';

Ioc.register('IClientApplication/IDefaultSiteReduxStore/', true, new SiteAltLanClientApplication());