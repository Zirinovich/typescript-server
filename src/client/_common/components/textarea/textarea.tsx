import * as React from 'react';
import {FormControl} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

interface IProps {
    name: string;
    type?: string;
    value?: string;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}

export class Textarea extends React.Component<IProps, IState> {
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
        const {name, type, value, required} = this.props;
        return (
            <FormControl componentClass="textarea"
                         name={name}
                         type={type ? type : 'text'}
                         value={value}
                         onChange={this.onChange.bind(this)}
                         required={required}/>
        )
    }
}