const {reducer} = require('redux-connect');
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';

import {IDefaultSiteReduxStore} from '../../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
import {counterReducer} from './redux/counterReducer';
import {starsReducer} from './redux/starsReducer';
import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';
import {localization} from '../../shared/tools/localization';

import {routes} from './routes'
import {ClientApplicationBase} from '../common/classes/ClientApplicationBase';

export class SiteAltLanClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    localizationResources = require('./localizationResurces.json');
    clientRoutes = routes;
    rootReducer = combineReducers<IDefaultSiteReduxStore>({
        routing: routerReducer,
        i18n: localization.getReducer(),
        counter: counterReducer,
        stars: starsReducer,
        form: formReducer,
        user: signInReducer,
        articles: articleReducer,
        reduxAsyncConnect: reducer
    });
}