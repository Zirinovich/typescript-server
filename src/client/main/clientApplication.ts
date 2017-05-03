import {combineReducers} from 'redux';

import {IDefaultSiteReduxStore} from './interfaces/IDefaultSiteReduxStore';
import {ClientApplicationBase} from '../_common/classes/ClientApplicationBase';
import {reducers} from './reducers';
import {routes} from './routes';

export class ClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    rootReducer = combineReducers<IDefaultSiteReduxStore>(reducers);

    clientRoutes = routes;
}