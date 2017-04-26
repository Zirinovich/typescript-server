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
                    <h3 className={style.title}>{title}</h3>
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