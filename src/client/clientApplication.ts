import {IClientApplication} from '../shared/interfaces/common/IClientApplication';
import {IDefaultSiteReduxStore} from '../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
import Ioc from "../shared/classes/ioc";

export const clientApplication = Ioc.resolve<IClientApplication<IDefaultSiteReduxStore>>('IClientApplication/IDefaultSiteReduxStore/');
