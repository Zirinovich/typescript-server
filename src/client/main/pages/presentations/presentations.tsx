import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Button} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {CubePortfolio} from '../../../_common/components/cubePortfolio/cubePortfolio';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
const style = require('./presentations.scss');

interface IProps {
    children?: any;
    params?: any;
    routes?: any;
}

interface IState {

}

export class Presentations extends React.Component<IProps, IState> {
    render() {
        const textSectionSubtitle = 'Точные телеком решения';
        const filters = [
            {
                name: 'Система тикетов',
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
                text: 'Тикет-система',
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
                text: 'Система тикетов',
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
            this.props.children ? this.props.children : <div className={style.presentations}>
                <SectionText subtitle={textSectionSubtitle}>
                    <LinkContainer to="/services">
                        <Button bsStyle="primary">Узнать больше</Button>
                    </LinkContainer>
                </SectionText>
                <Breadcrumbs title={i18n.t('main.presentationsPage')} params={this.props.params} routes={this.props.routes}/>
                <div className={style.portfolio_section}>
                    <Grid>
                        <CubePortfolio filters={filters} items={items}/>
                    </Grid>
                </div>
            </div>
        )
    }
}