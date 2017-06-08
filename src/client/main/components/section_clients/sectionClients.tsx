import * as React from 'react';
import {Grid, Clearfix} from 'react-bootstrap';

import {CarouselSlider} from '../../../_common/components/carouselSlider/carouselSlider';
import {SectionHeader} from '../section_header/sectionHeader';
const style = require('./sectionClients.scss');

//#region interfaces
interface IProps {

}

interface IState {

}
//#endregion

class SectionClients extends React.Component<IProps, IState> {
    public render() {
        const sectionCarouselTitle = 'Наши клиенты';
        const clients = [
            {
                src: require('./content/logo_rt.svg'),
                href: 'http://www.rostelecom.ru/'
            },
            {
                src: require('./content/tele2_logo.png'),
                href: 'https://tele2.ru/'
            },
            {
                src: require('./content/ellco_logo.png'),
                href: 'http://ellco.ru/'
            },
            {
                src: require('./content/beeline_logo.jpg'),
                href: 'https://www.beeline.ru'
            },
            {
                src: require('./content/beeline_kz_logo.png'),
                href: 'https://www.beeline.kz'
            }
        ];
        const items = clients.map((client) => {
            return (<a href={client.href} target="_blank">
                <img src={client.src} height={48}/>
            </a>);
        });
        return (
            <div className={style.section}>
                <SectionHeader title={sectionCarouselTitle}/>
                <Grid>
                    <Clearfix/>
                    <CarouselSlider items={items}/>
                </Grid>
            </div>
        );
    }
}

export {SectionClients}
