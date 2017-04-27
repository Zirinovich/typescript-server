import * as React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

interface IProps {

}

interface IState {

}

export class Header extends React.Component<IProps, IState> {
    render(){
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/admin">Admin panel</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/admin/users">
                            <NavItem eventKey={1}>Users</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/admin/rules">
                            <NavItem eventKey={2}>Rules</NavItem>
                        </LinkContainer>
                        <NavDropdown eventKey={3} title="Content" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Main</MenuItem>
                            <MenuItem eventKey={3.2}>Slider</MenuItem>
                            <MenuItem eventKey={3.3}>Presentations</MenuItem>
                        </NavDropdown>
                        <LinkContainer to="/admin/editor">
                            <NavItem eventKey={4}>Text editor</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/">
                            <NavItem>Site</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}