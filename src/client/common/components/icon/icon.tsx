import * as React from 'react';
import FontAwesome = require('react-fontawesome');

import '../../content/font-awesome/font-awesome.scss';

interface IProps {
    name: string;
}

interface IState {

}

export class Icon extends React.Component<IProps, IState> {
    render() {
        const {name} = this.props;
        return (
            <FontAwesome name={name}/>
        )
    }
}