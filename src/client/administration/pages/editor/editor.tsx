import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {ContentEditor} from '../../../_common/components/contentEditor/contentEditor';

interface IProps {

}

interface IState {

}

export class Editor extends React.Component<IProps, IState> {
    render() {
        return (
            <Grid>
                <ContentEditor/>
            </Grid>
        )
    }
}