import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
import {SectionHeader} from '../../components/section_header/sectionHeader';
import {SectionClients} from '../../components/section_clients/sectionClients';
const style = require('./partners.scss');

//#region interfaces
interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}
//#endregion

class Partners extends React.Component<IProps, IState> {
    public render() {
        const {params, routes} = this.props;

        const textSectionSubtitle = 'Точные телеком решения';
        const title = 'Наши Партнеры';
        const subtitle = 'Группа компаний ALT-LAN - это лучший опыт по разработке и внедрению OSS, BSS, VAS решений для телекоммуникационных компаний. Мы предлагаем услуги в области Разработки ПО, внедрению собственной линейки OSS-продуктов и системной интеграции проверенных решений.';
        const partners = [
            {
                src: require('./content/svc-logo.jpg'),
                href: 'http://www.sandvine.com/',
                title: 'Sandvine',
                text: 'Ведущий производитель систем анализа трафика и Network Analytics'
            },
            {
                src: require('./content/peerapp.png'),
                href: 'http://www.peerapp.com/',
                title: 'PeerApp',
                text: 'Системы кэширования трафика и CDN-решения'
            },
            {
                src: require('./content/depo_logo_main.png'),
                href: 'https://www.depo.ru/',
                title: 'Depo Computers',
                text: 'Российский производитель ИТ-оборудования.'
            },
            {
                src: require('./content/webcontrol.jpg'),
                href: 'http://web-control.ru/',
                title: 'Web Control',
                text: 'Обеспечение внутренней безопасности, оптимизация и повышение эффективности использования ИТ и телекоммуникационных инфраструктур.'
            }
        ];
        return (
            <div className={style.section}>
                <SectionText subtitle={textSectionSubtitle}/>
                <Breadcrumbs title={i18n.t('main.servicesPage')} params={params} routes={routes}/>
                <SectionHeader title={title} subtitle={subtitle}/>
                <Grid>
                    {
                        partners.map((partner, index) => {
                            return (
                                <div key={index} className={style.item}>
                                    <div className={style.img}>
                                        <a href={partner.href} target="_blank">
                                            <img src={partner.src}/>
                                        </a>
                                    </div>
                                    <div className={style.text}>
                                        <h6>{partner.title}</h6>
                                        <p>{partner.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Grid>
                <SectionClients/>
            </div>
        );
    }
}

export {Partners}
