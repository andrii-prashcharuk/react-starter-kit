// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Nav from '../components/Nav';
import HomePage from './home';
import SamplePage from './sample';
import getStore from '../utils/getStore';
import './App.scss';

const store = getStore();

const AppLayout = () => (
    <Provider store={store}>
        <BrowserRouter>
            <div className="AppLayout">
                <header>
                    <Nav />
                </header>
                <main>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/sample" component={SamplePage} />
                </main>
            </div>
        </BrowserRouter>
    </Provider>
);

export default AppLayout;
