import * as React from 'react';
import {Link} from 'react-router';
const {connect} = require('react-redux');

import {IUser} from '../../../shared/interfaces/authentication/IUser';
import {localization} from '../../../shared/tools/localization';
import {Icon} from '../../common/components/icon/icon';
const style = require('./header.scss');

interface IProps {
    currentLanguage?: string;
    languages?: {
        code: string;
        name: string;
    }[]
    dictionary?:any;
    user: IUser;
    logout: ()=>void;
    pathname: string;
    setCurrentLanguage?: (language:string)=>void;
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
        currentLanguage: localization.getCurrentLanguage(state),
        languages: localization.getLanguages(state)
    }),
    (dispatch) => ({
        setCurrentLanguage: (language) => dispatch(localization.setCurrentLanguage(language))
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
                label: localization.t('mainPage')
            },
            {
                to: '/lab',
                label: localization.t('labPage')
            },
            {
                to: '/contacts',
                label: localization.t('contactsPage')
            },
            {
                to: '/presentations',
                label: localization.t('presentationsPage')
            },
            {
                to: '/partners',
                label: localization.t('partnersPage')
            },
            {
                to: '/oss',
                label: localization.t('ossPage')
            }
        ];
        return (
            <header className={style.header}>

                <div id="topHeader">
                    <div className="wrapper">
                        <div className="top_nav three">
                            <div className="container">
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
                                                <Icon name="user"/> {localization.t('actionLogout')}
                                            </a>
                                        </li>
                                        :
                                        <li>
                                            <Link to="/login">
                                                <Icon name="user"/> {localization.t('actionLogin')}
                                            </Link>
                                        </li>
                                    }
                                    <li>
                                        <div className="country_selector">
                                            <Icon name="language"/> {localization.t('language')}
                                            <select id="source" onChange={this.languageChangeHandler.bind(this)} value={currentLanguage}>
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
                                                <button type="button"><Icon name="bars"/></button>
                                            </div>
                                        </div>
                                        <div id="navbar-collapse-1" className="navbar-collapse collapse pull-right">
                                            <nav>
                                                <ul className="nav navbar-nav">
                                                    {pageLinks.map((page, index) => renderNavItem({
                                                        ...page,
                                                        pathname,
                                                        index
                                                    }))}
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