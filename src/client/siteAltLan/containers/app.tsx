import {logout} from '../redux/signInActions';
const appConfig = require('../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Header} from '../components/header';
import {Footer}from '../components/footer';
import {Clearfix}  from 'react-bootstrap';
const {connect} = require('react-redux');
import {IUser} from '../../../shared/interfaces/authentication/IUser';

import '../../common/content/template/template';

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
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header user={user} logout={()=>{logout(dispatch)}} pathname={pathname}/>
                {this.props.children}
                <Clearfix/>
                <Footer/>
            </section>
        );
    }
}

export {App}
