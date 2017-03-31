import * as React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

import {IUser} from "../../../shared/interfaces/authentication/IUser";
const style = require('./header.scss');

interface IProps {
    user: IUser;
    logout: ()=>void;
    pathname: string;
}

interface IState {

}

const renderNavItem = ({to, label, pathname}) => (
    <LinkContainer to={to}>
        <li className="dropdown">
            <a href="#" className={'dropdown-toggle ' + (to === pathname ? 'active' : '')}> {label}</a>
        </li>
    </LinkContainer>
);

export class Header extends React.Component<IProps, IState> {
    render() {
        const {user, logout, pathname} = this.props;
        const pages = [
            {
                to: '/',
                label: 'Главная'
            },
            {
                to: '/lab',
                label: 'Lab'
            },
            {
                to: '/contacts',
                label: 'Контакты'
            },
            {
                to: '/presentation',
                label: 'Презентации решений'
            },
            {
                to: '/partners',
                label: 'Партнеры'
            },
            {
                to: '/oss',
                label: 'OSS решения'
            }
        ];
        return (
            <header className={style.header}>

                <div id="topHeader">
                    <div className="wrapper">
                        <div className="top_nav three">
                            <div className="container">
                                <ul>
                                    <li><i className="fa fa-comments"></i> 24x7  live Technical Support</li>
                                    <li><i className="fa fa-phone"></i> (888) 123-4567</li>
                                    { user &&
                                    <li>
                                        <i className="fa fa-user"></i> {user.fullName}
                                    </li>
                                    }
                                    { user ?
                                        <li>
                                            <a href="#" onClick={logout}>
                                                <i className="fa fa-user"></i> Выйти
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <LinkContainer to="/login">
                                                <a><i className="fa fa-user"></i> Войти</a>
                                            </LinkContainer>
                                        </li>
                                    }
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    <li className="last"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="clearfix"></div>

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
                                                    {pages.map((page) => {
                                                        return renderNavItem({
                                                            to: page.to,
                                                            label: page.label,
                                                            pathname
                                                        })
                                                    })}
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