import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';

const style = require('./sectionCards.scss');

interface IProps {
    cards: {
        title: string;
        icon?: JSX.Element,
        text?: string;
        to: string;
    }[]
}

interface IState {

}

export class SectionCards extends React.Component<IProps, IState> {
    render() {
        const {cards} = this.props;
        return (
            <div className={style.section}>
                <Grid>
                    <Row>
                        {cards && cards.map((card, i) => {
                            return (
                                <Col key={i} md={4}>
                                    <LinkContainer to={card.to}>
                                        <div className={style.card}>
                                            <div className={style.icon}>
                                                {card.icon}
                                            </div>
                                            <div className={style.text}>
                                                <h4>{card.title}</h4>
                                                <p>{card.text}</p>
                                            </div>
                                        </div>
                                    </LinkContainer>
                                </Col>
                            )
                        })}
                    </Row>
                </Grid>
            </div>
        )
    }
}