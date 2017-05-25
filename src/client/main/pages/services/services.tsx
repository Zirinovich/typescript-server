import * as React from 'react';
import {Grid} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionHeader} from '../../components/section_header/sectionHeader';

//#region interfaces
interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}
//#endregion

class Services extends React.Component<IProps, IState> {
    public render() {
        const {params, routes} = this.props;
        const title = 'READ OUR HISTORY';
        const subtitle = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue';
        return (
            <div>
                <Breadcrumbs title={i18n.t('main.servicesPage')} params={params} routes={routes}/>
                <SectionHeader title={title} subtitle={subtitle}/>
                <Grid>
                    <div>
                        <h6>
                            Lorem ipsum dolor sit amet consectetuer adipiscing elit Suspendisse et justo. Praesent mattis comm</h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est.  Lorem ipsum dolor sit amet.</p>
                        <br/>
                        <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commyolk augue. Aliquam ornare hendrerit augue. Cras tellus.</p>
                    </div>
                </Grid>
            </div>
        );
    }
}

export {Services}
