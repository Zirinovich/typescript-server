import {IClientApplication} from '../shared/interfaces/common/IClientApplication';
import {IDefaultSiteReduxStore} from '../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
import {Ioc} from './registration'

export const clientApplication = Ioc.resolve<IClientApplication<IDefaultSiteReduxStore>>('IClientApplication/IDefaultSiteReduxStore/');
