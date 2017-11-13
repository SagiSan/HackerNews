import {applyMiddleware, createStore, compose} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducers';

const middleware = applyMiddleware(promiseMiddleware(), thunk, createLogger());

export default createStore(reducer, compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f));
