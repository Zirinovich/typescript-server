import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

interface IOption {
    value: string | number;
    name?: any;
}

interface IProps {
    name: string;
    label?: any;
    value?: string | number;
    options: IOption[];
    onEvent?: EventDelegate;
}

interface IState {

}

export class FieldSelect extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        onEvent({
            event: EventMethodEnum.OnChange,
            value: e.target.value,
            name,
            type: EventComponentTypeEnum.Select
        });
    }

    render() {
        const {name, label, value, options} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                <FormControl componentClass="select"
                             name={name}
                             value={value}
                             onChange={this.onChange.bind(this)}>
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.name ? option.name : option.value}</option>
                        )
                    })}
                </FormControl>
            </div>
        )
    }
}