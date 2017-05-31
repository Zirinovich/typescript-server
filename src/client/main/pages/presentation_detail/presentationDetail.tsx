import * as React from 'react';
import {Grid} from 'react-bootstrap';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {RevolutionSlider} from '../../../_common/components/revolutionSlider/revolutionSlider';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionHeader} from '../../components/section_header/sectionHeader';
import {getPresentationById} from '../../redux/presentationsActions';

interface IProps {
    params?: any;
    routes?: any;
    getPresentationById?: any;
    presentations?: any;
}

interface IState {

}

@asyncConnect([{
    promise: ({
        store: {dispatch},
        params:{id}
    }) => {
        return dispatch(getPresentationById(id));
    }
}])
@connect(
    (state) => ({
        presentations: state.presentations
    })
)
export class PresentationDetail extends React.Component<IProps, IState> {
    render() {
        const {params, routes, presentations: {item: {title, text, slides, content}}} = this.props;

        return (
            <div>
                {slides && slides.length > 0 && <RevolutionSlider slides={slides}/>}
                <Breadcrumbs title={title} params={params} routes={routes}/>
                <SectionHeader title={title} subtitle={text}/>
                <Grid dangerouslySetInnerHTML={{__html: content}}/>
            </div>
        )
    }
}