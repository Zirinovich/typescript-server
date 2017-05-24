import * as React from 'react';
import {FormGroup, Clearfix, Col} from 'react-bootstrap';

import {FieldInput} from '../fieldInput/fieldInput';
import {FieldTextarea} from '../fieldTextarea/fieldTextarea';
import {FieldCheckbox} from '../fieldCheckbox/fieldCheckbox';
import {EventDelegate} from '../../interfaces/EventDelegate';

export interface ITypedField {
    name: string;
    value?: any;
    label: any;
    type: string;
}

//#region interfaces
interface IProps {
    fields: ITypedField[];
    onEvent?: EventDelegate;
}

interface IState {

}
//#endregion

export class TypedFieldsGroup extends React.Component<IProps, IState> {
    render() {
        const {fields, onEvent} = this.props;
        return (
            <div>
                {
                    fields.map((field, index) => {
                        let control;
                        const {name, value, label} = field;
                        switch (field.type) {
                            case 'boolean':
                                control = (
                                    <FieldCheckbox name={name}
                                                   value={value}
                                                   label={label}
                                                   onEvent={onEvent}/>);
                                break;
                            case "number":
                                control = (<FieldInput type="number"
                                                       name={name}
                                                       label={label}
                                                       value={value}
                                                       onEvent={onEvent}/>);
                                break;
                            case "text":
                                control = (<FieldTextarea name={name}
                                                          value={value}
                                                          onEvent={onEvent}/>);
                                break;
                            default:
                                control = (
                                    <FieldInput name={name}
                                                label={label}
                                                value={value}
                                                onEvent={onEvent}/>);
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