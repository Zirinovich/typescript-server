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
            <img src={require('./content/logo_rt.svg')} height={48}/>,
            <img src={require('./content/tele2_logo.png')} height={48}/>,
            <img src={require('./content/ellco_logo.png')} height={48}/>,
            <img src={require('./content/beeline_logo.jpg')} height={48}/>,
            <img src={require('./content/beeline_kz_logo.png')} height={48}/>
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
