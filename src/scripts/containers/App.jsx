import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Root from './Root';
import HomePage from './HomePage';
import SamplePage from './SamplePage';
import getStore from '../utils/getStore';
import './App.scss';

const store = getStore();

export default function App() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Root}>
                    <IndexRoute component={HomePage} />
                    <Route path="sample" component={SamplePage} />
                </Route>
            </Router>
        </Provider>
    );
}
