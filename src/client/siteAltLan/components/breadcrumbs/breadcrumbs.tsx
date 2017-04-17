import * as React from 'react';
import {Grid} from 'react-bootstrap';
import * as ReactBreadcrumbs from 'react-breadcrumbs';

const style = require('./breadcrumbs.scss');

interface IProps {
    routes?: any;
    params?: any;

    title?: any;
}

interface IState {

}

export class Breadcrumbs extends React.Component<IProps, IState> {
    render() {
        const {title, routes, params} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    <div className={style.title}>
                        <h3>{title}</h3>
                    </div>
                    <div className={style.path}>
                        <ReactBreadcrumbs
                            routes={routes}
                            params={params}
                            separator={<i className={style.separator}>/</i>}
                        />
                    </div>
                </Grid>
            </div>
        )
    }
}