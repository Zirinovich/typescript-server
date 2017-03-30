import * as React from 'react';
import {Link} from 'react-router';
import {NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {IUser} from "../../../shared/interfaces/authentication/IUser";
const style = require('./header.scss');

interface IProps {
    user: IUser;
    logout: ()=>void;
}

interface IState {

}

export class Header extends React.Component<IProps, IState> {
    render() {
        return (
            <header className={style.header}>

                <div id="topHeader">
                    <div className="wrapper">
                        <div className="top_nav three">
                            <div className="container">
                                <ul>
                                    <li><i className="fa fa-comments"></i> 24x7  live Technical Support</li>
                                    <li><i className="fa fa-phone"></i> (888) 123-4567</li>
                                    <li><a href="#"><i className="fa fa-comments"></i> Live Chat</a></li>
                                    <li><a href="#"><i className="fa fa-user"></i> Login</a></li>
                                    <li><a href="#"><i className="fa fa-user"></i> Register</a></li>
                                    <li>
                                        <div className="country_selector">Country
                                            <select id="source">
                                                <option selected={true} value="RU">Russia</option>
                                                <option value="US">United States</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="IN">India</option>
                                                <option value="JP">Japan</option>
                                                <option value="RS">Serbia</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="BR">Brasil</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    <li className="last"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.trueHeader}>
                    <div className="wrapper">
                        <div className="container">

                            <div className={style.logo}>
                                <Link to="/"/>
                            </div>

                            <div className={style.menu_main}>
                                <div className="navbar yamm">
                                    <div className="container">
                                        <div className="navbar-header">
                                            <div className="navbar-toggle .navbar-collapse .pull-right "
                                                 data-toggle="collapse"
                                                 data-target="#navbar-collapse-1"><span>Menu</span>
                                                <button type="button"><i className="fa fa-bars"></i></button>
                                            </div>
                                        </div>
                                        <div id="navbar-collapse-1" className="navbar-collapse collapse pull-right">
                                            <nav>
                                                <ul className="nav navbar-nav">
                                                    <LinkContainer to='/' className="active">
                                                        <NavItem>Главная</NavItem>
                                                    </LinkContainer>

                                                    <LinkContainer to='/lab'>
                                                        <NavItem>Lab</NavItem>
                                                    </LinkContainer>

                                                    <LinkContainer to='/contacts'>
                                                        <NavItem>Контакты</NavItem>
                                                    </LinkContainer>

                                                    <LinkContainer to='/contacts'>
                                                        <NavItem>Презентации решений</NavItem>
                                                    </LinkContainer>

                                                    <LinkContainer to='/contacts'>
                                                        <NavItem>Партнеры</NavItem>
                                                    </LinkContainer>

                                                    <LinkContainer to='/contacts'>
                                                        <NavItem>OSS решения</NavItem>
                                                    </LinkContainer>

                                                    { this.props.user ?
                                                        <NavItem onClick={this.props.logout}>Выйти</NavItem>
                                                        :
                                                        <LinkContainer to='/login'>
                                                            <NavItem>Вход</NavItem>
                                                        </LinkContainer>
                                                    }
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        )
    }
}