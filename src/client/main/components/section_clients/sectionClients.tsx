import * as React from 'react';
import {Grid, Clearfix} from 'react-bootstrap';

import {CarouselSlider} from '../../../_common/components/carouselSlider/carouselSlider';
import {SectionHeader} from '../section_header/sectionHeader';
const style = require('./sectionClients.scss');

//#region interfaces
interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}
//#endregion

class SectionClients extends React.Component<IProps, IState> {
    public render() {
        const sectionCarouselTitle = 'Наши клиенты';
        const clients = [
            <img src={require('./content/logo-rt.svg')} height={48}/>,
            <img src={require('./content/tele2-logo.png')} height={48}/>,
            <img src={require('./content/ellco_logo.png')} height={48}/>,
            <img src={require('./content/beeline-logo.jpg')} height={48}/>,
            <img src={require('./content/mts_logo.png')} height={48}/>
        ];
        return (
            <div className={style.section}>
                <SectionHeader title={sectionCarouselTitle}/>
                <Grid>
                    <Clearfix/>
                    <CarouselSlider items={clients}/>
                </Grid>
            </div>
        );
    }
}

export {SectionClients}
