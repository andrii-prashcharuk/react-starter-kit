// @flow
import React from 'react';
import styled from '@emotion/styled';
import type { Node } from 'react';
import { NavLink } from 'react-router-dom';

const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 5px 10px;
  display: block;
`;

const Nav = (): Node => (
    <nav
        css={{
            padding: 10,
        }}
    >
        <List>
            <ListItem>
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/sample" activeClassName="active">Sample Page</NavLink>
            </ListItem>
        </List>
    </nav>
);

export default Nav;
