import * as React from 'react';
import {Grid, Button} from 'react-bootstrap';

import {CubePortfolio} from "../../../common/components/cubePortfolio/cubePortfolio";
import {TextSection} from "../../components/text_section/textSection";
const style = require('./presentations.scss');

interface IProps {

}

interface IState {

}

export class Presentations extends React.Component<IProps, IState> {
    render() {
        const textSectionSubtitle = 'Точные телеком решения';
        const filters = [
            {
                name: 'Trouble Ticket System',
                value: 'trouble-ticket-system'
            },
            {
                name: 'Личный кабинет',
                value: 'dashboard'
            },
            {
                name: 'Сайт',
                value: 'site'
            }
        ];
        const items = [
            {
                src: require('./content/supr.png'),
                title: 'Система управления плановыми работами (СУПР)',
                text: 'Trouble Ticket System',
                classes: ['trouble-ticket-system'],
                to: '/presentations/1'
            },
            {
                src: require('./content/ellco.png'),
                title: 'Личный кабинет Ellco',
                text: '',
                classes: ['dashboard'],
                to: '/presentations/2'
            },
            {
                src: require('./content/tele2.png'),
                title: 'Система тикетов Tele2',
                text: 'Trouble Ticket System',
                classes: ['trouble-ticket-system'],
                to: '/presentations/3'
            },
            {
                src: require('./content/ladony.png'),
                title: 'Сайт ladony.ru',
                text: '',
                classes: ['site'],
                to: '/presentations/4'
            }
        ];
        return (
            <div className={style.presentations}>
                <TextSection subtitle={textSectionSubtitle} button={<Button bsStyle="primary">Узнать больше</Button>}/>
                <div className={style.portfolio_section}>
                    <Grid>
                        <CubePortfolio filters={filters} items={items}/>
                    </Grid>
                </div>
            </div>
        )
    }
}