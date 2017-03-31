import Ioc from '../shared/classes/ioc';
import {DefaultSiteMiniClientApplication} from './defaultSiteMini/defaultSiteMiniClientApplication';

Ioc.register("IClientApplication/IDefaultSiteReduxStore/", true, new DefaultSiteMiniClientApplication());