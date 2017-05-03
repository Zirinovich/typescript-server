import * as React from 'react';
import * as i18next from 'i18next'
const {connect} = require('react-redux');

interface IProps {
    currentLanguage?: string;
    resources?: any;
    locKey: string;
    options?:any;
}

interface IState {

}

@connect(
    (state) => ({
        currentLanguage: state.i18n.currentLanguage,
        resources: state.i18n.resources,
    })
)
export class Loc extends React.Component<IProps, IState> {
    render() {
        const {currentLanguage, resources, locKey, options} = this.props;
        i18next.init({
            lng: currentLanguage,
            resources: resources
        });
        return (
            <span>{i18next.t(locKey, options)}</span>
        )
    }
}