// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import type { AppStore, State } from '../constants';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default (initialState: State): AppStore => createStoreWithMiddleware(reducer, initialState);
