'use strict';
import React from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

const styles = {
  nav: {
    padding: 10
  },
  menu: {
    margin: 0,
    padding: 0,
    display: 'flex',
    listStyle: 'none'
  },
  menuItem: {
    display: 'block',
    padding: '5px 10px'
  },
  main: {
    padding: 10
  }
};

export default class App extends Radium(React.Component) {
  render () {
    return (
      <div>
        <nav style={styles.nav}>
          <ul style={styles.menu}>
            <li><Link to="/" style={styles.menuItem}>Home</Link></li>
            <li><Link to="/sample" style={styles.menuItem}>Sample Page</Link></li>
          </ul>
        </nav>
        <main style={styles.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}