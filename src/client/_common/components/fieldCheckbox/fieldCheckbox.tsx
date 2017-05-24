import * as React from 'react';
import {Checkbox, ControlLabel} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

//#region interfaces
interface IProps {
    name: string;
    label?: any;
    type?: string;
    value?: boolean;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}
//#endregion

export class FieldCheckbox extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        if (onEvent) {
            onEvent({
                event: EventMethodEnum.OnChange,
                value: e.target.checked,
                name,
                type: EventComponentTypeEnum.Checkbox
            });
        }
    }

    render() {
        const {name, label, value} = this.props;
        return (
            <ControlLabel>
                <Checkbox name={name}
                          label={label}
                          checked={value}
                          onChange={this.onChange.bind(this)}
                          inline/>
                {label}
            </ControlLabel>
        )
    }
}