import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from '../utils/configureStore';
import SampleInitialState from '../reducers/sample/sampleInitialState';
import App from './App';
import HomePage from './HomePage';
import SamplePage from './SamplePage';

const getInitialState = () => {
    const sample = new SampleInitialState();
    return { sample };
};
const store = configureStore(getInitialState());

export default function Root() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="sample" component={SamplePage} />
                </Route>
            </Router>
        </Provider>
    );
}
