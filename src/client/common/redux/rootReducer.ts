import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {counterReducer} from '../../defaultSiteMini/redux/counterReducer';
import {starsReducer} from '../../defaultSiteMini/redux/starsReducer';
import {IReduxStore} from '../../../shared/interfaces/defaultModule/IReduxStore';
import {signInReducer} from '../../defaultSiteMini/redux/signInReducer';

import {reducer as formReducer} from 'redux-form'
const {reducer} = require('redux-connect');

const rootReducer: Redux.Reducer<IReduxStore> = combineReducers<IReduxStore>({
    routing: routerReducer,
    counter: counterReducer,
    stars: starsReducer,
    form: formReducer,
    account: signInReducer,
    reduxAsyncConnect: reducer,
});

export default rootReducer;
