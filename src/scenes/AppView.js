// @flow
import React from 'react';
import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import NavView from '../components/Nav';
import HomePage from './home';
import SamplePage from './sample';
import getStore from '../utils/getStore';

const store = getStore();

const AppLayout = (): Node => (
    <Provider store={store}>
        <BrowserRouter>
            <div
                css={{
                    padding: 10,
                }}
            >
                <Global
                    styles={css`
                        ${emotionNormalize}
                        html,
                        body {
                          padding: 0;
                          margin: 0;
                          background: white;
                          min-height: 100%;
                          font-family: Helvetica, Arial, sans-serif;
                        }
                      `}
                />
                <header>
                    <NavView />
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
