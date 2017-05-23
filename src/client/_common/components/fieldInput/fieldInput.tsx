import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

//#region interfaces
interface IProps {
    name: string;
    label?: any;
    type?: string;
    value?: any;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}
//#endregion

export class FieldInput extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        onEvent({
            event: EventMethodEnum.OnChange,
            value: e.target.value,
            name,
            type: EventComponentTypeEnum.Input
        });
    }

    render() {
        const {name, label, type, value, required} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                <FormControl name={name}
                             type={type ? type : 'text'}
                             value={value}
                             onChange={this.onChange.bind(this)}
                             required={required}/>
            </div>
        )
    }
}