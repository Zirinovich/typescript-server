import * as React from 'react';
import { Grid, Clearfix } from 'react-bootstrap';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import { Gallery } from '../../../_common/components/gallery/gallery';
import { ContentWrapper } from '../../../_common/components/contentWrapper/contentWrapper';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { SectionHeader } from '../../components/section_header/sectionHeader';
import { getPresentationById } from '../../redux/presentationsActions';

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
        const images = slides.map((slide) => {
           return {
               original: slide.src,
               thumbnail: slide.src
           }
        });
        return (
            <div>
                <Breadcrumbs title={title} params={params} routes={routes}/>
                <Clearfix/>
                <Grid>
                    <Gallery images={images}/>
                    <Clearfix/>
                </Grid>
                <Clearfix/>
                <SectionHeader title={title} subtitle={text}/>
                <Grid>
                    <ContentWrapper content={content}/>
                </Grid>
            </div>
        )
    }
}