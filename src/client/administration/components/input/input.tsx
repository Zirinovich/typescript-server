import * as React from 'react';
import {FormControl} from 'react-bootstrap';
import {EventDelegate} from "../../../_common/interfaces/EventDelegate";
import {EventMethodEnum} from "../../../_common/interfaces/EventMethodEnum";
import {EventComponentTypeEnum} from "../../../_common/interfaces/EventComponentTypeEnum";

interface IProps {
    name: string;
    type?: string;
    value?: string;
    onEvent?: EventDelegate;
}

interface IState {

}

export class Input extends React.Component<IProps, IState> {
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
        const {name, type, value} = this.props;
        return (
            <FormControl name={name} type={type ? type : 'text'} value={value} onChange={this.onChange.bind(this)}/>
        )
    }
}