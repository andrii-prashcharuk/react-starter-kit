// @flow
import configureStore from './configureStore';
import sampleInitialState from '../reducers/sample/_sampleInitialState';

const getStore = () => configureStore({
    sample: sampleInitialState,
});

export default getStore;
