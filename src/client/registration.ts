import Ioc from '../shared/classes/ioc';
import {DefaultSiteMiniClientApplication} from './defaultSiteMini/defaultSiteMiniClientApplication';
import {SiteAltLanClientApplication} from './siteAltLan/siteAltLanClientApplication';
import {IsDefaultSiteMini} from "../shared/siteSwitcher";

if(IsDefaultSiteMini) {
    Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());
} else {
    Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new SiteAltLanClientApplication());
}