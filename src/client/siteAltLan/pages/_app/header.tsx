import * as React from 'react';
import {Link} from 'react-router';
import {Grid, Navbar, Nav, NavItem, Clearfix} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
const {connect} = require('react-redux');
const Sticky = require('sticky-js');

import {IUser} from '../../../../shared/ajaxDto/authentication/IUser';
import {i18n} from '../../../../shared/tools/i18n/i18n';
import {Icon} from '../../../common/components/icon/icon';
const style = require('./header.scss');

interface IProps {
    currentLanguage?: string;
    languages?: {
        code: string;
        name: string;
    }[]
    dictionary?: any;
    user: IUser;
    logout: ()=>void;
    pathname: string;
    setCurrentLanguage?: (language: string)=>void;
}

interface IState {

}

@connect(
    (state) => ({
        currentLanguage: state.i18n.currentLanguage,
        languages: state.i18n.languages
    }),
    (dispatch) => ({
        setCurrentLanguage: (language) => dispatch(i18n.setCurrentLanguage(language))
    })
)
export class Header extends React.Component<IProps, IState> {
    componentDidMount() {
        new Sticky('.' + style.bottom_header);
    }

    languageChangeHandler(e) {
        let language = e.target.value;
        this.props.setCurrentLanguage(language);
    }

    render() {
        const {user, logout, pathname, currentLanguage, languages} = this.props;

        const pageLinks = [
            {
                to: '/',
                label: i18n.t('mainPage')
            },
            {
                to: '/contacts',
                label: i18n.t('contactsPage')
            },
            {
                to: '/presentations',
                label: i18n.t('presentationsPage')
            },
            {
                to: '/partners',
                label: i18n.t('partnersPage')
            },
            {
                to: '/oss',
                label: i18n.t('ossPage')
            }
        ];
        return (
            <header className={style.header}>
                <div className={style.top_header}>
                    <div className={style.wrapper}>
                        <div className={style.top_nav}>
                            <Grid>
                                <ul>
                                    <li><Icon name="phone"/>(888) 123-4567</li>
                                    { user &&
                                    <li>
                                        <Icon name="user"/>{user.fullName}
                                    </li>
                                    }
                                    { user &&
                                    <li>
                                        <Link to="/admin">
                                            <Icon name="gears"/>{i18n.t('adminPanel')}
                                        </Link>
                                    </li>
                                    }
                                    { user ?
                                        <li>
                                            <a href="#" onClick={logout}>
                                                <Icon name="user"/>{i18n.t('actionLogout')}
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/login">
                                                <Icon name="user"/>{i18n.t('actionLogin')}
                                            </Link>
                                        </li>
                                    }
                                    <li>
                                        <div>
                                            <Icon name="language"/>{i18n.t('language')}
                                            <select className={style.select}
                                                    onChange={this.languageChangeHandler.bind(this)}
                                                    value={currentLanguage}>
                                                {
                                                    languages.map((lng, i) => {
                                                        return (
                                                            <option key={i} value={lng.code}>{lng.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </li>
                                    <li><a href="#"><Icon name="facebook"/></a></li>
                                    <li><a href="#"><Icon name="twitter"/></a></li>
                                    <li><a href="#"><Icon name="plus"/></a></li>
                                    <li>
                                        <a href="#"><Icon name="linkedin"/></a>
                                    </li>
                                </ul>
                            </Grid>
                        </div>
                    </div>
                </div>
                <Clearfix/>
                <div className={style.bottom_header}>
                    <div className={style.wrapper}>
                        <Grid>
                            <div className={style.logo}>
                                <Link to="/">
                                    <img src={require('./content/logo.svg')} height={64}/>
                                </Link>
                            </div>
                            <div className={style.menu_main}>
                                <Navbar className={style.nav_bar} collapseOnSelect>
                                    <div>
                                        <Navbar.Header className={style.toggle_header}>
                                            <Link to="/">
                                                <img src={require('./content/logo_inverse.svg')} height={64}/>
                                            </Link>
                                            <Navbar.Toggle/>
                                        </Navbar.Header>
                                        <div className={style.collapse_wrapper}>
                                            <Navbar.Collapse>
                                                <nav>
                                                    <Nav>
                                                        {pageLinks.map((page, index) => {
                                                            let activeClassName = style.active;
                                                            let className = classNames(page.to === pathname && activeClassName);
                                                            return (
                                                                <LinkContainer key={index}
                                                                               to={page.to}>
                                                                    <NavItem
                                                                        className={className}>{page.label}</NavItem>
                                                                </LinkContainer>
                                                            )
                                                        })}
                                                    </Nav>
                                                </nav>
                                            </Navbar.Collapse>
                                        </div>
                                    </div>
                                </Navbar>
                            </div>
                        </Grid>
                    </div>
                </div>
            </header>
        )
    }
}