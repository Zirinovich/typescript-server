const {reducer} = require('redux-connect');
import {IDefaultSiteReduxStore} from '../../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';
import {counterReducer} from './redux/counterReducer';
import {starsReducer} from './redux/starsReducer';
import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';

import {routes} from './routes'
import {ClientApplicationBase} from '../common/classes/ClientApplicationBase';
import {i18n} from '../../shared/tools/i18n/i18n';

export class ClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    localizationResources = require('./localizationResurces.json');
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

    clientRoutes = routes;
}