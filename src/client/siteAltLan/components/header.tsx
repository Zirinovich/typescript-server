import * as React from 'react';
import {Link} from 'react-router';
// import {LinkContainer} from 'react-router-bootstrap';
import FontAwesome = require("react-fontawesome");

import {IUser} from "../../../shared/interfaces/authentication/IUser";
const style = require('./header.scss');

interface IProps {
    user: IUser;
    logout: ()=>void;
    pathname: string;
}

interface IState {

}

const renderNavItem = (page) => {
    const {to, label, index, pathname} = page;
    return (
        <li className="dropdown" key={`${index}-page-link`}>
            <Link to={to} className={classNames('dropdown-toggle', to === pathname && 'active')}>{label}</Link>
        </li>
    )
};

export class Header extends React.Component<IProps, IState> {
    render() {
        const {user, logout, pathname} = this.props;
        const pageLinks = [
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
                                    <li><FontAwesome name="comments"/> 24x7  live Technical Support</li>
                                    <li><FontAwesome name="phone"/> (888) 123-4567</li>
                                    { user &&
                                    <li>
                                        <FontAwesome name="user"/> {user.fullName}
                                    </li>
                                    }
                                    { user ?
                                        <li>
                                            <a href="#" onClick={logout}>
                                                <FontAwesome name="user"/> Выйти
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/login">
                                                <FontAwesome name="user"/> Войти
                                            </Link>
                                        </li>
                                    }
                                    <li><a href="#"><FontAwesome name="facebook"/></a></li>
                                    <li><a href="#"><FontAwesome name="twitter"/></a></li>
                                    <li><a href="#"><FontAwesome name="plus"/></a></li>
                                    <li className="last"><a href="#"><FontAwesome name="linkedin"/></a></li>
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
                                                <button type="button"><FontAwesome name="bars"/></button>
                                            </div>
                                        </div>
                                        <div id="navbar-collapse-1" className="navbar-collapse collapse pull-right">
                                            <nav>
                                                <ul className="nav navbar-nav">
                                                    {pageLinks.map((page, index) => renderNavItem({...page, pathname, index}))}
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