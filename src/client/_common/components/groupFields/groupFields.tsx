import * as React from 'react';
import {FormGroup, Clearfix, Col} from 'react-bootstrap';

import {FieldInput} from '../fieldInput/fieldInput';
import {FieldTextarea} from '../fieldTextarea/fieldTextarea';
import {FieldCheckbox} from '../fieldCheckbox/fieldCheckbox';
import {EventArgsDto} from '../../interfaces/EventArgsDto';
import {EventMethodEnum} from '../../interfaces/EventMethodEnum';

interface IField{
    name: string;
    label: any;
    type: string;
}

interface IProps {
    fields: IField[];
}

interface IState {

}

export class GroupFields extends React.Component<IProps, IState> {
    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }
    
    render(){
        const {fields} = this.props;
        return (
            <div>
                {
                    fields.map((field, index) => {
                        let control;
                        let value = this.state[field.name];
                        switch (field.type) {
                            case 'boolean':
                                control = (
                                    <FieldCheckbox name={field.name}
                                                   value={value}
                                                   label={field.label}
                                                   onEvent={this.onEventHandler.bind(this)}/>);
                                break;
                            case "number":
                                control = (<FieldInput type="number"
                                                       name={field.name}
                                                       label={field.label}
                                                       value={value}
                                                       onEvent={this.onEventHandler.bind(this)}/>);
                                break;
                            case "text":
                                control = (<FieldTextarea name={field.name}
                                                          value={value}
                                                          onEvent={this.onEventHandler.bind(this)}/>);
                                break;
                            default:
                                control = (
                                    <FieldInput name={field.name}
                                                label={field.label}
                                                value={value}
                                                onEvent={this.onEventHandler.bind(this)}/>);
                        }
                        return (
                            <FormGroup key={index}>
                                <Col md={12}>
                                    {control}
                                </Col>
                                <Clearfix/>
                            </FormGroup>
                        )
                    })
                }
            </div>
        )
    }
}