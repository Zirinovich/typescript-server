import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, FormGroup, Clearfix, Col} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
import {FieldTextarea} from '../../../_common/components/fieldTextarea/fieldTextarea';
import {FieldCheckbox} from '../../../_common/components/fieldCheckbox/fieldCheckbox';
import {EventArgsDto} from '../../../_common/interfaces/EventArgsDto';
import {EventMethodEnum} from '../../../_common/interfaces/EventMethodEnum';
import {saveRole} from '../../redux/rolesActions';

//#region interfaces
interface IProps {
    show: boolean;
    onHide: any;
    handleSubmit: any;
    data?: any;
    roles: any;
    saveRole?: any;
}

interface IState {
    id?: any;
    name?: string;
}
//#endregion

const rules = [
    {
        name: 'test_string',
        label: 'test string',
        type: 'string'
    },
    {
        name: 'test_number',
        label: 'test number',
        type: 'number'
    },
    {
        name: 'test_boolean',
        label: 'test boolean',
        type: 'boolean'
    },
    {
        name: 'test_text',
        label: 'test text',
        type: 'text'
    }
];

@connect(
    (state) => ({}),
    (dispatch) => ({
        saveRole: (role) => dispatch(saveRole(role))
    })
)
export class RoleCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    id = generator.genId();

    componentDidUpdate() {
        const {data} = this.props;
        const {id} = this.state;
        if (data.id !== id) {
            const state = {
                id: data.id,
                name: data.name
            };
            this.setState(state);
        }
    }

    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        const {onHide, saveRole} = this.props;
        saveRole(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, name} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form onSubmit={this.submitHandler.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title id={this.id}>
                            {i18n.t(id ? 'administration.editRole' : 'administration.createRole')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Col md={4}>
                                <FieldInput name="name" value={name} onEvent={this.onEventHandler.bind(this)}
                                            label={i18n.t('administration.role')} required/>
                            </Col>
                            <Clearfix/>
                        </FormGroup>
                        {
                            rules.map((rule, index) => {
                                let control;
                                let value = this.state[rule.name];
                                switch (rule.type) {
                                    case 'boolean':
                                        control = (
                                            <FieldCheckbox name={rule.name}
                                                           value={value}
                                                           label={rule.label}
                                                           onEvent={this.onEventHandler.bind(this)}/>);
                                        break;
                                    case "number":
                                        control = (<FieldInput type="number"
                                                               name={rule.name}
                                                               label={rule.label}
                                                               value={value}
                                                               onEvent={this.onEventHandler.bind(this)}/>);
                                        break;
                                    case "text":
                                        control = (<FieldTextarea name={rule.name}
                                                                  value={value}
                                                                  onEvent={this.onEventHandler.bind(this)}/>);
                                        break;
                                    default:
                                        control = (
                                            <FieldInput name={rule.name}
                                                        label={rule.label}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" bsStyle="primary">{i18n.t('administration.save')}</Button>
                        <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}