import * as React from 'react';
import {Grid, Button} from 'react-bootstrap';
import {Link} from 'react-router';

import {i18n} from '../../../_common/tools/i18n/i18n';
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
                    <h1 className={style.subtitle}>{i18n.t('main.pageNotFound')}</h1>
                    <p>
                        <Link to="/">
                            <Button bsStyle="primary">{i18n.t('main.toMainPage')}</Button>
                        </Link>
                    </p>
                </Grid>
            </div>
        );
    }
}