const appConfig = require('../../../../config/main');
// TODO: привести в порядок подобные ссылки, каким то образом посредством указания корневых каталогов или типа того

import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Header} from '../components/header';
import {Grid}  from 'react-bootstrap';

import '../../common/content/bootstrap-slate/bootstrap.scss';


 // require('./app.scss');

class App extends React.Component<any, any> {
    public render() {
        return (
            <section>
                <Helmet {...appConfig.app} {...appConfig.app.head}/>
                <Header />
                <Grid>
                    {this.props.children}
                </Grid>
            </section>
        );
    }
}

export {App}
