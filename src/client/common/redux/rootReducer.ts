import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {counterReducer} from '../../defaultSiteMini/redux/reducers/counterReducer';
import {starsReducer} from '../../defaultSiteMini/redux/reducers/starsReducer';
import {IReduxStore} from '../../../shared/interfaces/defaultModule/IReduxStore';

const {reducer} = require('redux-connect');

const rootReducer: Redux.Reducer<IReduxStore> = combineReducers<IReduxStore>({
    routing: routerReducer,
    counter: counterReducer,
    stars: starsReducer,
    reduxAsyncConnect: reducer,
});

export default rootReducer;
