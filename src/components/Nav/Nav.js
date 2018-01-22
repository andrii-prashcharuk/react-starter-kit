import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
    return (
        <nav className="Nav">
            <ul>
                <li><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/sample" activeClassName="active">Sample Page</NavLink></li>
            </ul>
        </nav>
    );
}
