import * as React from 'react';
import {Link} from 'react-router';
import {Grid, Clearfix} from 'react-bootstrap';
const {connect} = require('react-redux');

import {IUser} from '../../../shared/interfaces/authentication/IUser';
import {Icon} from '../../common/components/icon/icon';
import {i18n} from '../../../shared/tools/i18n/i18n';
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

const renderNavItem = (page) => {
    const {to, label, index, pathname} = page;
    return (
        <li key={`${index}-page-link`}>
            <Link to={to} className={classNames(to === pathname && 'active')}>{label}</Link>
        </li>
    )
};

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
                to: '/lab',
                label: i18n.t('labPage')
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

                <div id="topHeader">
                    <div className={style.wrapper}>
                        <div className="top_nav three">
                            <Grid>
                                <ul>
                                    <li><Icon name="phone"/> (888) 123-4567</li>
                                    { user &&
                                    <li>
                                        <Icon name="user"/> {user.fullName}
                                    </li>
                                    }
                                    { user ?
                                        <li>
                                            <a href="#" onClick={logout}>
                                                <Icon name="user"/> {i18n.t('actionLogout')}
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/login">
                                                <Icon name="user"/> {i18n.t('actionLogin')}
                                            </Link>
                                        </li>
                                    }
                                    <li>
                                        <div className="country_selector">
                                            <Icon name="language"/> {i18n.t('language')}
                                            <select id="source" onChange={this.languageChangeHandler.bind(this)}
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
                                    <li className="last"><a href="#"><Icon name="linkedin"/></a></li>
                                </ul>
                            </Grid>
                        </div>
                    </div>
                </div>

                <Clearfix/>

                <div className={style.trueHeader}>
                    <div className={style.wrapper}>
                        <Grid>

                            <div className={style.logo}>
                                <Link to="/"/>
                            </div>

                            <div className={style.menu_main}>
                                <div className="navbar yamm">
                                    <Grid>
                                        <div className="navbar-header">
                                            <div className="navbar-toggle .navbar-collapse .pull-right "
                                                 data-toggle="collapse"
                                                 data-target="#navbar-collapse-1"><span>Menu</span>
                                                <button type="button"><Icon name="bars"/></button>
                                            </div>
                                        </div>
                                        <div id="navbar-collapse-1" className="navbar-collapse collapse pull-right">
                                            <nav>
                                                <ul className="nav navbar-nav">
                                                    <li className="dropdown"><a
                                                        href="http://codelayers.net/foxuhost/layout2/fullwidth/index.html"
                                                        className="dropdown-toggle"> Layouts</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout2/fullwidth/index.html">Layout Light</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout3/fullwidth/index.html">Layout Classic</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout4/fullwidth/index.html">Layout Light2</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout5/fullwidth/index.html">Layout Classic2</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout6/fullwidth/index.html">Layout Classic3</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout1/fullwidth/index.html">Layout Creative</a>
                                                            </li>
                                                            <li><a
                                                                href="http://codelayers.net/foxuhost/layout7/fullwidth/index.html">Layout One Page</a>
                                                            </li>
                                                            <li className="dropdown-submenu mul"><a href="#">Header Styles</a>
                                                                <ul className="dropdown-menu">
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout2/fullwidth/index.html">Header Style1</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout3/fullwidth/index.html">Header Style2</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout4/fullwidth/index.html">Header Style3</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout5/fullwidth/index.html">Header Style4</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout6/fullwidth/index.html">Header Style5</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout1/fullwidth/index.html">Header Style6</a>
                                                                    </li>
                                                                    <li><a
                                                                        href="http://codelayers.net/foxuhost/layout7/fullwidth/index.html">Header Style7</a>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    {pageLinks.map((page, index) => renderNavItem({
                                                        ...page,
                                                        pathname,
                                                        index
                                                    }))}
                                                </ul>
                                            </nav>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </div>
                </div>
            </header>
        )
    }
}