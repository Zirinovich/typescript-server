import {logout} from '../redux/signInActions';
const appConfig = require('../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Header} from '../components/header';
import {Grid}  from 'react-bootstrap';
const {connect} = require('react-redux');
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

import '../../_common/content/bootstrap-cerulean_theme/bootstrap.scss';

interface IProps {
    user: IUserDto;
    dispatch: ()=>void;
    children?: any;
}

@connect(
    (state) => ({user: state.user})
)
class App extends React.Component<IProps, any> {
    public render() {
        const {user, dispatch, children} = this.props;
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header user={user} logout={()=>{logout(dispatch)}}/>
                <Grid>
                    {children}
                </Grid>
            </section>
        );
    }
}

export {App}
