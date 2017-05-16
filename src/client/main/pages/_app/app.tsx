import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Clearfix}  from 'react-bootstrap';
const {connect} = require('react-redux');

import {getMD5base64} from '../../../../shared/tools/index';
const appConfig = require('../../../../../config/main');
import {i18n} from '../../../_common/tools/i18n/i18n';
import '../../../_common/content/template/template.scss';
import {logout} from '../../redux/signInActions';
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того
import {UserDto} from '../../../../shared/ajaxDto/authentication/UserDto';
import {Header} from './header';
import {ScrollUp} from './scrollUp';
import {Footer}from './footer';
const languages = require('../../i18nLanguages.json');
const resources = require('../../i18n.json');
const style = require('./app.scss');

interface IProps {
    location?: any;
    routes?: any;

    user: UserDto;
    setLanguages: any;
    setResources: any;
    dispatch: ()=>void;
}

@connect(
    (state) => ({user: state.user}),
    (dispatch) => ({
        setLanguages: (languages) => dispatch(i18n.setLanguages(languages)),
        setResources: (key, resources) => dispatch(i18n.setResources(key, resources))
    })
)
class App extends React.Component<IProps, any> {
    componentWillMount() {
        const {setLanguages, setResources} = this.props;
        setLanguages(languages);
        setResources('main', resources);
    }

    public render() {
        const {user, dispatch, location: {pathname}, routes} = this.props;
        const key = getMD5base64(pathname);
        const transitionName = {
            enter: style.page_transition_enter,
            enterActive: style.page_transition_enter_active,
            leave: style.page_transition_leave,
            leaveActive: style.page_transition_leave_active,
            appear: style.page_transition_appear,
            appearActive: style.page_transition_appear_active
        };
        const isAdminPanel = routes && routes[1] && routes[1].path === 'admin';
        return (
            <div className={style.app}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                {!isAdminPanel && <Header user={user} logout={()=>{logout(dispatch)}} pathname={pathname}/>}
                <div className={style.content}>
                    <ReactCSSTransitionGroup
                        key={key}
                        component="div"
                        transitionName={transitionName}
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnter={true}
                        transitionEnterTimeout={500}
                        transitionLeave={false}>
                        {this.props.children}
                    </ReactCSSTransitionGroup>
                    <Clearfix/>
                </div>
                {!isAdminPanel && <div>
                    <Clearfix/>
                    <ScrollUp/>
                    <Footer/>
                </div>}
            </div>
        );
    }
}

export {App}
