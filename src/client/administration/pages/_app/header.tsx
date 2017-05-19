import * as React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';

//#region interfaces
interface IProps {

}

interface IState {

}
//#endregion

export class Header extends React.Component<IProps, IState> {
    render(){
        return(
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/admin">{i18n.t('administration.adminPanel')}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/admin/content">
                            <NavItem eventKey={1}>{i18n.t('administration.content')}</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/admin/users">
                            <NavItem eventKey={2}>{i18n.t('administration.users')}</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/admin/roles">
                            <NavItem eventKey={3}>{i18n.t('administration.roles')}</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/">
                            <NavItem>{i18n.t('administration.site')}</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}