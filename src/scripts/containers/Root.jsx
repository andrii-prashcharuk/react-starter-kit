import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App, HomePage, SamplePage } from './index';

export default class Root extends React.Component {

  propTypes: {
    store: React.PropTypes.object.isRequired
  };

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