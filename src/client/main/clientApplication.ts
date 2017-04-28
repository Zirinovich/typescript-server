const {reducer} = require('redux-connect');
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';

import {IDefaultSiteReduxStore} from './interfaces/IDefaultSiteReduxStore';
import {ClientApplicationBase} from '../common/classes/ClientApplicationBase';
import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';
import {usersReducer} from '../administration/reducers'; //TODO: Create universal redux export
import {i18n} from '../../shared/tools/i18n/i18n';
import {routes} from './routes'

export class ClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    localizationResources = require('./localizationResurces.json');
    rootReducer = combineReducers<IDefaultSiteReduxStore>({
        routing: routerReducer,
        i18n: i18n.getReducer(),
        form: formReducer,
        user: signInReducer,
        users: usersReducer,
        articles: articleReducer,
        reduxAsyncConnect: reducer
    });

    clientRoutes = routes;
}