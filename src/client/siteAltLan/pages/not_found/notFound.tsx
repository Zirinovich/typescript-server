import * as React from 'react';
import {Grid} from 'react-bootstrap';

const style = require('./notFound.scss');

interface IProps {

}

interface IState {

}

export class NotFound extends React.Component<IProps, IState> {
    render() {
        return (
            <div className={style.section}>
                <Grid>
                    <h1 className={style.title}>4<span>0</span>4</h1>
                    <h1 className={style.subtitle}>Oops... Page Not Found!</h1>
                    <p>
                        Sorry the Page Could not be Found here. Try using the button below to go to main page of the site</p>
                </Grid>
            </div>
        );
    }
}