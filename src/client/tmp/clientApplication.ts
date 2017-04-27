const {reducer} = require('redux-connect');
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';

import {IDefaultSiteReduxStore} from './interfaces/IDefaultSiteReduxStore';
import {counterReducer} from './redux/counterReducer';
import {starsReducer} from './redux/starsReducer';
import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';
import {i18n} from '../../shared/tools/i18n/i18n';

import {routes} from './routes'
import {ClientApplicationBase} from '../common/classes/ClientApplicationBase';

export class ClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    localizationResources = require('./localizationResurces.json');
    clientRoutes = routes;
    rootReducer = combineReducers<IDefaultSiteReduxStore>({
        routing: routerReducer,
        i18n: i18n.getReducer(),
        counter: counterReducer,
        stars: starsReducer,
        form: formReducer,
        user: signInReducer,
        articles: articleReducer,
        reduxAsyncConnect: reducer
    });
}