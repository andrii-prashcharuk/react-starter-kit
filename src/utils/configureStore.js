// @flow
import { createStore, applyMiddleware } from 'redux';
import type { Dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import type { SagaMiddleware } from 'redux-saga';
import reducer, { sagas } from '../reducers';
import type { AppStore, State, Action } from '../types';

export const sagaMiddleware: SagaMiddleware<{}> = createSagaMiddleware<{}>();

const createStoreWithMiddleware = applyMiddleware<
    State, Action, Dispatch<Action>
>(sagaMiddleware)(createStore);

export default (initialState: State): AppStore => {
    const store: AppStore = createStoreWithMiddleware(reducer, initialState);

    sagaMiddleware.run(sagas);

    return store;
};
