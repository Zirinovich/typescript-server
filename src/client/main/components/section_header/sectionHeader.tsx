import * as React from 'react';
import {Grid} from 'react-bootstrap';

const style = require('./sectionHeader.scss');

interface IProps {
    title: any;
    subtitle?: string;
}

interface IState {

}

export class SectionHeader extends React.Component<IProps, IState> {
    render() {
        const {title, subtitle} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    <h1 className={style.title}>{title}</h1>
                    <div className={style.line}></div>
                    <p className={style.subtitle}>{subtitle}</p>
                </Grid>
            </div>
        )
    }
}