const appConfig = require('../../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Header} from '../components/header';

const style = require('./app.scss');

class App extends React.Component<any, any> {
    public render() {
        return (
            <section className={style.AppContainer}>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header />
                {this.props.children}
            </section>
        );
    }
}

export {App}
