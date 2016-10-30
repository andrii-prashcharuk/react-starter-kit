import React from 'react';
import { Link } from 'react-router';

const styles = {
    nav: {
        padding: 10,
    },
    menu: {
        margin: 0,
        padding: 0,
        display: 'flex',
        listStyle: 'none',
    },
    menuItem: {
        display: 'block',
        padding: '5px 10px',
    },
    main: {
        padding: 10,
    },
};

export default function App(props) {
    return (
        <div>
            <nav style={styles.nav}>
                <ul style={styles.menu}>
                    <li><Link to="/" style={styles.menuItem}>Home</Link></li>
                    <li><Link to="/sample" style={styles.menuItem}>Sample Page</Link></li>
                </ul>
            </nav>
            <main style={styles.main}>
                {props.children}
            </main>
        </div>
    );
}

App.prototype.propTypes = {
    children: React.PropTypes.node,
};
