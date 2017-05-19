import {combineReducers} from 'redux';

import {ClientApplicationBase} from '../_common/classes/ClientApplicationBase';
import {reducers} from './reducers';
import {routes} from './routes';
import {IMainSiteReduxStore} from "./interfaces/IMainSiteReduxStore";

export class ClientApplication extends ClientApplicationBase<IMainSiteReduxStore> {
    rootReducer = combineReducers<IMainSiteReduxStore>(reducers);

    clientRoutes = routes;
}