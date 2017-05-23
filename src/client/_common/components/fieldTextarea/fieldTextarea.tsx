import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

interface IProps {
    name: string;
    label?: any;
    value?: string;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}

export class FieldTextarea extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        onEvent({
            event: EventMethodEnum.OnChange,
            value: e.target.value,
            name,
            type: EventComponentTypeEnum.Textarea
        });
    }

    render() {
        const {name, label, value, required} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                <FormControl componentClass="textarea"
                             name={name}
                             value={value}
                             onChange={this.onChange.bind(this)}
                             required={required}/>
            </div>
        )
    }
}