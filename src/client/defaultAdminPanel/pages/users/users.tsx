import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {ReactBootstrapTable} from '../../../common/components/reactBootstrapTable/reactBootstrapTable';

interface IProps {

}

interface IState {

}

export class Users extends React.Component<IProps, IState> {
    render() {
        return (
            <Grid>
                <ReactBootstrapTable/>
            </Grid>
        );
    }
}