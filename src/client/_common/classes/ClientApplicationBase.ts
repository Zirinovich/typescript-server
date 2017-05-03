import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import {IClientApplication} from '../interfaces/IClientApplication';
const appConfig = require('./../../../../config/main');

export abstract class ClientApplicationBase<TStoreInterface> implements IClientApplication<TStoreInterface> {
    rootReducer: Redux.Reducer<TStoreInterface>;

    clientRoutes: any;

    configureStore(history, initialState) {
        const middlewares: Redux.Middleware[] = [
            routerMiddleware(history),
            thunk,
        ];

        /** Add Only Dev. Middlewares */
        if (appConfig.env !== 'production' && process.env.BROWSER) {
            // const logger = createLogger();
            // middlewares.push(logger);
        }

        const composeEnhancers = (appConfig.env !== 'production' &&
            typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

        const store = createStore(this.rootReducer, initialState, composeEnhancers(
            applyMiddleware(...middlewares),
        ));

        return store;
    }
}