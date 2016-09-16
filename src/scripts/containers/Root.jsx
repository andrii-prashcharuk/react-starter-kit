'use strict';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import SamplePage from './SamplePage';

class Root extends React.Component {
  render () {
    return (
      <Provider store={ this.props.store }>
        <Router history={browserHistory}>
          <Route path='/' component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="sample" component={SamplePage}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
