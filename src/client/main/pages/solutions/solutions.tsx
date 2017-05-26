import * as React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
import {SectionHeader} from '../../components/section_header/sectionHeader';
import {ItemHover} from '../../components/item_hover/itemHover';
import {SectionOrderButton} from '../../components/section_order_button/sectionOrderButton';
import {SectionClients} from '../../components/section_clients/sectionClients';
const style = require('./solutions.scss');

//#region interfaces
interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}
//#endregion

class Solutions extends React.Component<IProps, IState> {
    public render() {
        const {params, routes} = this.props;

        const textSectionSubtitle = 'Точные телеком решения';
        const title = 'OSS решения';
        const subtitle = 'Наши продукты используются крупнейшими телеком-компаниями России, Казахстана, Таджикистана, Киргизии и других стран. Закажите подробную информацию по нашим продуктам.';
        const solutions = [
            {
                title: 'ERMS',
                text: 'Trouble management',
                src: require('./content/erms.jpg')
            },
            {
                title: 'OPL',
                text: 'Maintenance & Resource coordination',
                src: require('./content/opl.jpg')
            },
            {
                title: 'WFM',
                text: 'Workforce management',
                src: require('./content/wfm.jpg')
            }
        ];
        return (
            <div>
                <SectionText subtitle={textSectionSubtitle}/>
                <Breadcrumbs title={i18n.t('main.servicesPage')} params={params} routes={routes}/>
                <SectionHeader title={title} subtitle={subtitle}/>
                <Grid className={style.section}>
                    <Row>
                        {
                            solutions.map((solution, index) => {
                                return (
                                    <Col key={index} md={4}>
                                        <ItemHover title={solution.title}
                                                   text={solution.text}>
                                            <img src={solution.src} className={style.image}/>
                                        </ItemHover>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Grid>
                <SectionOrderButton/>
                <SectionClients/>
            </div>
        );
    }
}

export {Solutions}
