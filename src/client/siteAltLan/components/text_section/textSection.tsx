import * as React from 'react';
import {Grid} from 'react-bootstrap';

const style = require('./textSection.scss');

interface IProps {
    title?: string;
    subtitle?: string;
    text?: string;
    button?: JSX.Element;
}

interface IState {

}

export class TextSection extends React.Component<IProps, IState> {
    render() {
        const {title, subtitle, text, button} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    {title && <h1 className={style.title}>{title}</h1>}
                    {subtitle && <h1 className={style.subtitle}>{subtitle}</h1>}
                    <br/>
                    {text && <p className={style.text}>{text}</p>}
                    {false && <a href="#" className={style.button}>Purchase now!</a>}
                    {button}
                </Grid>
            </div>
        )
    }
}