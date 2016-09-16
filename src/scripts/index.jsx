'use strict';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './utils/configureStore';
import SampleInitialState from './reducers/sample/sampleInitialState';

const getInitialState = () => {
  sampleData: new SampleInitialState();
};
const store = configureStore(getInitialState());

render((<Root store={store} />), document.getElementById('root'));