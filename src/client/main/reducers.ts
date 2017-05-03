const {reducer} = require('redux-connect');
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux';

import {signInReducer} from './redux/signInReducer';
import {articleReducer} from './redux/serverRenderReducer';
import {reducers as administrationReducers} from '../administration/reducers';
import {i18n} from '../_common/tools/i18n/i18n';

export const reducers = Object.assign({
    routing: routerReducer,
    i18n: i18n.getReducer(),
    form: formReducer,
    user: signInReducer,
    articles: articleReducer,
    reduxAsyncConnect: reducer
}, administrationReducers);