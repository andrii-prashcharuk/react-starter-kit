import configureStore from './configureStore';
import SampleInitialState from '../reducers/sample/SampleInitialState';

export default function getStore() {
    return configureStore({
        sample: new SampleInitialState(),
    });
}
