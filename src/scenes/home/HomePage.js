// @flow
import React from 'react';

const WELCOME_TITLE = 'Welcome to React Starter Kit';
const WELCOME_TEXT = 'Click on "Sample Page" link to see page with sample data from server';

const HomePage = () => (
    <section>
        <h4>{WELCOME_TITLE}</h4>
        <p>{WELCOME_TEXT}</p>
    </section>
);

export default HomePage;
