import * as React from 'react';
import {Link} from 'react-router';
import {Grid, Navbar, Nav, NavItem, Clearfix} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
const {connect} = require('react-redux');
const Sticky = require('sticky-js');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {ILanguage} from '../../../_common/tools/i18n/II18n';
import {Icon} from '../../../_common/components/icon/icon';
import {SessionDto} from '../../../../shared/ajaxDto/authentication/SessionDto';
import {logout} from '../../redux/signInActions';
const style = require('./header.scss');

interface IProps {
    currentLanguage?: string;
    languages?: ILanguage[];
    dictionary?: any;
    session?: SessionDto;
    pathname: string;
    setCurrentLanguage?: (language: string)=>void;
    logout?: () => void;
}

interface IState {

}

@connect(
    (state) => ({
        session: state.session,
        currentLanguage: state.i18n.currentLanguage,
        languages: state.i18n.languages
    }),
    (dispatch) => ({
        setCurrentLanguage: (language) => dispatch(i18n.setCurrentLanguage(language)),
        logout: () => dispatch(logout())
    })
)
export class Header extends React.Component<IProps, IState> {
    componentDidMount() {
        new Sticky('.' + style.bottom_header);
    }

    languageChangeHandler(e) {
        const language = e.target.value;
        const {setCurrentLanguage} = this.props;

        setCurrentLanguage(language);
    }

    render() {
        const {session, logout, pathname, currentLanguage, languages} = this.props;

        const pageLinks = [
            {
                to: '/',
                label: i18n.t('main.mainPage')
            },
            {
                to: '/contacts',
                label: i18n.t('main.contactsPage')
            },
            {
                to: '/presentations',
                label: i18n.t('main.presentationsPage')
            },
            {
                to: '/partners',
                label: i18n.t('main.partnersPage')
            },
            {
                to: '/oss',
                label: i18n.t('main.ossPage')
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
                                    { session &&
                                    <li>
                                        <Icon name="user"/>{session.user.username}
                                    </li>
                                    }
                                    { session &&
                                    <li>
                                        <Link to="/admin">
                                            <Icon name="gears"/>{i18n.t('main.adminPanel')}
                                        </Link>
                                    </li>
                                    }
                                    { session ?
                                        <li>
                                            <a href="#" onClick={logout}>
                                                <Icon name="user"/>{i18n.t('main.actionLogout')}
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/login">
                                                <Icon name="user"/>{i18n.t('main.actionLogin')}
                                            </Link>
                                        </li>
                                    }
                                    <li>
                                        <div>
                                            <Icon name="language"/>{i18n.t('main.language')}
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