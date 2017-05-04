import * as React from 'react';
import {Clearfix}  from 'react-bootstrap';
const {connect} = require('react-redux');

import {i18n} from '../../../_common/tools/i18n/i18n';
const i18nResources = require('../../i18n.json');
import {Header} from './header';
const style = require('./app.scss');

interface IProps {
    setResources: any;
}

@connect(
    (state) => ({user: state.user}),
    (dispatch) => ({
        setResources: (resources, key) => dispatch(i18n.setResources(resources, key))
    })
)
class App extends React.Component<IProps, any> {
    componentWillMount() {
        const {setResources} = this.props;
        setResources('administration', i18nResources);
    }

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
