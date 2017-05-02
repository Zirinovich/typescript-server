import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {Tinymce} from '../../../_common/components/tinymce/tinymce';

interface IProps {

}

interface IState {

}

export class Editor extends React.Component<IProps, IState> {
    render() {
        return (
            <Grid>
                <Tinymce/>
            </Grid>
        )
    }
}