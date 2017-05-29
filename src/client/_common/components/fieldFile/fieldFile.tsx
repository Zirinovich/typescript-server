import * as React from 'react';
import {FormControl, ControlLabel} from 'react-bootstrap';

import {EventDelegate} from '../../interfaces/EventDelegate';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';
import {EventComponentTypeEnum} from '../../interfaces/EventComponentTypeEnum';

//#region interfaces
interface IProps {
    name: string;
    label?: any;
    value?: any;
    onEvent?: EventDelegate;
    required?: boolean;
}

interface IState {

}
//#endregion

export class FieldFile extends React.Component<IProps, IState> {
    onChange(e) {
        const {name, onEvent} = this.props;
        if(onEvent){
            onEvent({
                event: EventMethodEnum.OnChange,
                value: e.target.value,
                name,
                type: EventComponentTypeEnum.File
            });
        }
    }

    render() {
        const {name, label, value, required} = this.props;
        return (
            <div>
                {label && <ControlLabel>{label}</ControlLabel>}
                <FormControl name={name}
                             type="file"
                             value={value}
                             onChange={this.onChange.bind(this)}
                             required={required}/>
            </div>
        )
    }
}