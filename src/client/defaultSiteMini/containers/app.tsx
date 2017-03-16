import {logout} from '../redux/signInActions';
const appConfig = require('../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Header} from '../components/header';
import {Grid}  from 'react-bootstrap';
const {connect} = require('react-redux');
import {IUser} from '../../../shared/interfaces/authentication/IUser';

import '../../common/content/bootstrap-slate/bootstrap.scss';

interface IProps {
    account: IUser;
    dispatch: ()=>void;
}

@connect(
    (state) => ({account: state.account})
)
class App extends React.Component<IProps, any> {
    public render() {
        const {account, dispatch} = this.props;
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header account={account} logout={()=>{logout(dispatch)}}/>
                <Grid>
                    {this.props.children}
                </Grid>
            </section>
        );
    }
}

export {App}
