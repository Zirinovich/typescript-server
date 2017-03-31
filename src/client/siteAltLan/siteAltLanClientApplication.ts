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


export class SiteAltLanClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    rootReducer = combineReducers<IDefaultSiteReduxStore>({
        routing: routerReducer,
        counter: counterReducer,
        stars: starsReducer,
        form: formReducer,
        user: signInReducer,
        articles: articleReducer,
        reduxAsyncConnect: reducer
    });

    clientRoutes = routes;
}