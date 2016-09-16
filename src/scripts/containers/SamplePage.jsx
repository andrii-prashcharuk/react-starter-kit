'use strict';
import React from 'react';
import SampleComponent from '../components/SampleComponent';

export default class BuildsPage extends React.Component {
  render() {
    return (
      <section>
        <h4>On this page you can see a sample data from server</h4>
        <SampleComponent/>
      </section>
    );
  }
}
