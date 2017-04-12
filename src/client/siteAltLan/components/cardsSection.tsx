import * as React from 'react';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

const style = require('./cardsSection.scss');

interface IProps {
    title?: any;
    subtitle?: string;
    cards?: {
        title: string;
        icon?: JSX.Element,
        text?: string;
    }[]
}

interface IState {

}

export class CardsSection extends React.Component<IProps, IState> {
    render() {
        const {title, subtitle, cards} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    <h1 className={style.title}>{title}</h1>
                    <div className={style.line}></div>
                    <p className={style.subtitle}>{subtitle}</p>
                    <Clearfix/>

                    <Row>
                        {cards && cards.map((card, i) => {
                            return (
                                <Col key={i} md={4}>
                                    <div className={style.card}>
                                        <div className={style.icon}>
                                            {card.icon}
                                        </div>
                                        <div className={style.text}>
                                            <h4>{card.title}</h4>
                                            <p>{card.text}</p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        )
    }
}