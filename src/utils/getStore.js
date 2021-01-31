// @flow
import type { AppStore, State } from '../types';
import configureStore from './configureStore';
import sampleInitialState from '../reducers/sample/sampleInitialState';

const getStore = (initialState?: State = {}): AppStore => configureStore({
    sample: sampleInitialState,
    ...initialState,
});

export default getStore;
