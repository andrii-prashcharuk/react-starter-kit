import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default initialState => createStoreWithMiddleware(reducer, initialState);
