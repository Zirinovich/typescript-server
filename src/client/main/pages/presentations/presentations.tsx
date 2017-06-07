import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Button} from 'react-bootstrap';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {CubePortfolio} from '../../../_common/components/cubePortfolio/cubePortfolio';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
import {getPresentations} from '../../redux/presentationsActions';
const style = require('./presentations.scss');

interface IProps {
    params?: any;
    routes?: any;
    presentations?: any;
    children?: any;
}

interface IState {

}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getPresentations());
    }
}])
@connect(
    (state) => ({
        presentations: state.presentations
    })
)
export class Presentations extends React.Component<IProps, IState> {
    render() {
        const {presentations: {list}, children} = this.props;
        const textSectionSubtitle = 'Точные телеком решения';
        const filters = [
            {
                name: 'Система тикетов',
                value: 'trouble-ticket-system'
            },
            {
                name: 'Система оповещения',
                value: 'alert-system'
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
        const items = list.map((item) => {
            return Object.assign(item, {
                to: '/presentations/' + item.id
            });
        });
        return (
            children ? children : <div className={style.presentations}>
                <SectionText subtitle={textSectionSubtitle}>
                    <LinkContainer to="/services">
                        <Button bsStyle="primary">Узнать больше</Button>
                    </LinkContainer>
                </SectionText>
                <Breadcrumbs title={i18n.t('main.presentationsPage')} params={this.props.params}
                             routes={this.props.routes}/>
                <div className={style.portfolio_section}>
                    <Grid>
                        <CubePortfolio filters={filters} items={items}/>
                    </Grid>
                </div>
            </div>
        )
    }
}