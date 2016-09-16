'use strict';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

/**
 * ## Reducer
 * The reducer contains all reducers
 */
import reducer from '../reducers';

/**
 * ## creatStoreWithMiddleware
 */
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default (initialState) => createStoreWithMiddleware(reducer, initialState);
