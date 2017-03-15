import {IReduxStore} from '../../shared/interfaces/defaultModule/IReduxStore';
const appConfig = require('../../../config/main');
import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/rootReducer';
const createLogger = require('redux-logger');

export function configureStore(history, initialState?: IReduxStore): Redux.Store<IReduxStore> {

    const middlewares: Redux.Middleware[] = [
        routerMiddleware(history),
        thunk,
    ];

    /** Add Only Dev. Middlewares */
    if (appConfig.env !== 'production' && process.env.BROWSER) {
        const logger = createLogger();
        middlewares.push(logger);
    }

    const composeEnhancers = (appConfig.env !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares),
    ));

    if (appConfig.env === 'development' && (module as any).hot) {
        (module as any).hot.accept('./redux/rootReducer', () => {
            store.replaceReducer(require('./redux/rootReducer'));
        });
    }

    return store;
}
