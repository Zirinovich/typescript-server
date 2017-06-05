import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';

interface IProps {
    name: string;
    label?: any;
}

interface IState {

}

export class FieldSelect extends React.Component<IProps, IState> {
    render() {
        const {name, label} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                <FormControl componentClass="select" name={name}>
                    <option value="select">select</option>
                    <option value="other">...</option>
                </FormControl>
            </div>
        )
    }
}