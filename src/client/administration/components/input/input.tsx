import * as React from 'react';
import {FormControl} from 'react-bootstrap';

interface IProps {
    name: string;
    type?: string;
    value?: string;
    onEvent?: (event: any, name: string, value: string)=> void;
}

interface IState {

}

export class Input extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        onEvent(e, name, e.target.value);
    }

    render() {
        const {name, type, value} = this.props;
        return (
            <FormControl name={name} type={type ? type : 'text'} value={value} onChange={this.onChange.bind(this)}/>
        )
    }
}