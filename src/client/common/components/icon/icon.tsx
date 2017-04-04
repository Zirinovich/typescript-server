import * as React from 'react';
import FontAwesome = require('react-fontawesome');

interface IProps {
    name:string;
}

interface IState {

}

export class Icon extends React.Component<IProps, IState>{
    render(){
        return (
            <FontAwesome name={this.props.name}/>
        )
    }
}