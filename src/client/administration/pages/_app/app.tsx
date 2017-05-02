import * as React from 'react';
import {Clearfix}  from 'react-bootstrap';
const {connect} = require('react-redux');

const appConfig = require('../../../../../config/main');
import '../../../_common/content/template/template.scss';
import {getMD5base64} from '../../../../shared/tools/index';
//import {logout} from '../../redux/signInActions';
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того
//import {IUserDto} from '../../../../shared/interfaces/authentication/IUserDto';
import {Header} from './header';
const style = require('./app.scss');

interface IProps {

}

class App extends React.Component<IProps, any> {
    public render() {
        return (
            <div className={style.app}>
                <Header/>
                <div className={style.content}>
                    {this.props.children}
                    <Clearfix/>
                </div>
            </div>
        );
    }
}

export {App}
