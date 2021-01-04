// @flow
import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './scenes/AppView';

const root = document.getElementById('root');

if (root) {
    render((<App />), root);
}

if (module.hot) {
    module.hot.accept();
}
