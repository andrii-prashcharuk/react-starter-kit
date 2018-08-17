// @flow
import configureStore from './configureStore';
import sampleInitialState from '../reducers/sample/sampleInitialState';

const getStore = () => configureStore({
    sample: sampleInitialState,
});

export default getStore;
