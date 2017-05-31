import * as React from 'react';
const {connect} = require('react-redux');

import {RevolutionSlider} from '../../../_common/components/revolutionSlider/revolutionSlider';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {getPresentationById} from '../../redux/presentationsActions';

interface IProps {
    params?: any;
    routes?: any;
    getPresentationById?: any;
    presentations?: any;
}

interface IState {

}

@connect(
    (state) => ({
        presentations: state.presentations
    }),
    (dispatch) => ({
        getPresentationById: (id) => dispatch(getPresentationById(id))
    })
)
export class PresentationDetail extends React.Component<IProps, IState> {
    componentDidMount() {
        const {params, routes, getPresentationById} = this.props;
        //console.log(params, routes);
        getPresentationById(params.id);
    }

    render() {
        const {params, routes, presentations: {item: {title, text, slides}}} = this.props;

        return (
            <div>
                {slides && slides.length > 0 && <RevolutionSlider slides={slides}/>}
                <Breadcrumbs title={title} params={params} routes={routes}/>
            </div>
        )
    }
}