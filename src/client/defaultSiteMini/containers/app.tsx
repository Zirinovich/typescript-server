import {logout} from '../redux/signInActions';
const appConfig = require('../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
//import {Header} from '../components/header';
import {Header} from '../components/superHeader';
import {Grid}  from 'react-bootstrap';
const {connect} = require('react-redux');
import {IUser} from '../../../shared/interfaces/authentication/IUser';

import '../../common/content/bootstrap-cerulean_theme/bootstrap.scss';
import '../../common/content/template/template.scss';

interface IProps {
    user: IUser;
    dispatch: ()=>void;
}

@connect(
    (state) => ({user: state.user})
)
class App extends React.Component<IProps, any> {
    public render() {
        const {user, dispatch} = this.props;
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header user={user} logout={()=>{logout(dispatch)}}/>
                <Grid>
                    {this.props.children}
                </Grid>
            </section>
        );
    }
}

export {App}
