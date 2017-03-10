import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {IReduxStore} from '../../../interfaces/defaultModule/IReduxStore';
import {counterReducer} from '../../defaultModule/redux/reducers/counterReducer';
import {starsReducer} from '../../defaultModule/redux/reducers/starsReducer';

const {reducer} = require('redux-connect');

const rootReducer: Redux.Reducer<IReduxStore> = combineReducers<IReduxStore>({
    routing: routerReducer,
    counter: counterReducer,
    stars: starsReducer,
    reduxAsyncConnect: reducer,
});

export default rootReducer;
