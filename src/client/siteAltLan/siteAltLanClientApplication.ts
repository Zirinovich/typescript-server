const {reducer} = require('redux-connect');
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';
import {i18nReducer} from 'redux-react-i18n';

import {IDefaultSiteReduxStore} from '../../shared/interfaces/defaultModule/IDefaultSiteReduxStore';
import {counterReducer} from './redux/counterReducer';
import {starsReducer} from './redux/starsReducer';
import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';

import {routes} from './routes'
import {ClientApplicationBase} from '../common/classes/ClientApplicationBase';

const dictionaries = require('./dictionaries.json');

const languages = [
    {
        code: 'ru',
        name: 'Русский'
    },
    {
        code: 'en',
        name: 'English'
    }
];

export class SiteAltLanClientApplication extends ClientApplicationBase<IDefaultSiteReduxStore> {
    rootReducer = combineReducers<IDefaultSiteReduxStore>({
        routing: routerReducer,
        i18n: i18nReducer,
        counter: counterReducer,
        stars: starsReducer,
        form: formReducer,
        user: signInReducer,
        articles: articleReducer,
        reduxAsyncConnect: reducer
    });

    clientRoutes = routes;

    dictionaries = dictionaries;
    languages = languages;
}