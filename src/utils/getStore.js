import configureStore from './configureStore';
import SampleInitialState from '../reducers/sample/SampleInitialState';

const getStore = () => configureStore({
    sample: new SampleInitialState(),
});

export default getStore;
