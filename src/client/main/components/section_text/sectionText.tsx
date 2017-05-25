import * as React from 'react';
import {Grid} from 'react-bootstrap';

const style = require('./sectionText.scss');

interface IProps {
    title?: string;
    subtitle?: string;
    text?: string;
}

interface IState {

}

export class SectionText extends React.Component<IProps, IState> {
    render() {
        const {title, subtitle, text, children} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    {title && <h1 className={style.title}>{title}</h1>}
                    {subtitle && <h1 className={style.subtitle}>{subtitle}</h1>}
                    <br/>
                    {text && <p className={style.text}>{text}</p>}
                    {children}
                </Grid>
            </div>
        )
    }
}