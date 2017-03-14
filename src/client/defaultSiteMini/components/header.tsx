import * as React from 'react';
import {Link} from 'react-router';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

/*const style = require('./header.scss');*/

export const Header = () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to='/'>Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav navbar>
                <LinkContainer to="/about">
                    <NavItem>About</NavItem>
                </LinkContainer>
                <LinkContainer to="/counter">
                    <NavItem>Counter</NavItem>
                </LinkContainer>
                <LinkContainer to="/stars">
                    <NavItem>Stars</NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    /*<nav className={style.Nav}>
     <ul>
     <li><Link to="/">Home</Link></li>
     <li><Link to="about">About</Link></li>
     <li><Link to="counter">Counter</Link></li>
     <li><Link to="stars">Stars</Link></li>
     </ul>
     </nav>*/
);
