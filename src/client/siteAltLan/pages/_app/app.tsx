import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Clearfix}  from 'react-bootstrap';
const {connect} = require('react-redux');

const appConfig = require('../../../../../config/main');
import '../../../common/content/template/template.scss';
import {getMD5base64} from '../../../../shared/tools/index';
import {logout} from '../../redux/signInActions';
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того
import {IUser} from '../../../../shared/interfaces/authentication/IUser';
import {Header} from './header';
import {ScrollUp} from './scrollUp';
import {Footer}from './footer';
const style = require('./app.scss');

interface IProps {
    location?: any;

    user: IUser;
    dispatch: ()=>void;
}

@connect(
    (state) => ({user: state.user})
)
class App extends React.Component<IProps, any> {
    public render() {
        const {user, dispatch, location: {pathname}} = this.props;
        const key = getMD5base64(pathname);
        const transitionName = {
            enter: style.page_transition_enter,
            enterActive: style.page_transition_enter_active,
            leave: style.page_transition_leave,
            leaveActive: style.page_transition_leave_active,
            appear: style.page_transition_appear,
            appearActive: style.page_transition_appear_active
        };
        return (
            <div className={style.app}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header user={user} logout={()=>{logout(dispatch)}} pathname={pathname}/>
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
                <Clearfix/>
                <ScrollUp/>
                <Footer/>
            </div>
        );
    }
}

export {App}
