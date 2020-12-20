// @flow
import type { AppStore } from '../constants';
import configureStore from './configureStore';
import sampleInitialState from '../reducers/sample/sampleInitialState';

const getStore = (): AppStore => configureStore({
    sample: sampleInitialState,
});

export default getStore;
