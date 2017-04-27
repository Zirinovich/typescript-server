import * as React from 'react';
import {Link} from 'react-router';
import {Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

export const Header = (props: {user: IUserDto, logout: ()=>void}) => (
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
                <LinkContainer to="/contacts">
                    <NavItem>Contacts</NavItem>
                </LinkContainer>
                <NavDropdown title="RemoteFetch" id="remote-fetch-dd">
                    <LinkContainer to="/fetch/1">
                        <MenuItem>1</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/fetch/2">
                        <MenuItem>2</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/fetch/some">
                        <MenuItem>some</MenuItem>
                    </LinkContainer>
                </NavDropdown>
                <LinkContainer to="/parallel">
                    <NavItem>ParallelFetch</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                { props.user ?
                    <NavItem onClick={props.logout}>Выйти</NavItem>
                    :
                    <LinkContainer to='/login'>
                        <NavItem>Вход</NavItem>
                    </LinkContainer>
                }
            </Nav>
            {props.user && <Navbar.Text pullRight>{props.user.fullName}</Navbar.Text>}
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
