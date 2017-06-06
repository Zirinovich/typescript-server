import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, FormGroup, Clearfix, Col} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
import {TypedFieldsGroup, ITypedField} from '../../../_common/components/typedFieldsGroup/typedFieldsGroup';
import {EventArgsDto} from '../../../_common/interfaces/EventArgsDto';
import {EventMethodEnum} from '../../../_common/interfaces/EventMethodEnum';
import {IRoles} from '../../interfaces/IRoles';
import {saveRole} from '../../redux/rolesActions';

//#region interfaces
enum Mode {
    Create,
    Edit
}

interface IProps {
    show: boolean;
    onHide: any;
    handleSubmit: any;
    roles: IRoles;
    saveRole?: any;
}

interface IState {
    idrole?: any;
    rolename?: string;
}
//#endregion

let rules: ITypedField[] = [
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
    (state) => ({
        roles: state.roles
    }),
    (dispatch) => ({
        saveRole: (role) => dispatch(saveRole(role))
    })
)
export class RoleCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.state = {
            rolename: ''
        }
    }

    mode = Mode.Create;

    componentDidUpdate() {
        const {roles: {item}} = this.props;
        const {idrole} = this.state;

        const lastMode = this.mode;
        this.mode = !!item ? Mode.Edit : Mode.Create;
        if ((lastMode === Mode.Edit && this.mode === Mode.Create) || (this.mode === Mode.Edit && item.idrole !== idrole)) {
            this.setState({
                idrole: item ? item.idrole : null,
                rolename: item ? item.rolename : ''
            });
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
        console.log(this.state);
        saveRole(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {idrole, rolename} = this.state;
        rules.map((r) => {
            r.value = this.state[r.name];
            return r;
        });
        return (
            <Modal show={show} onHide={onHide} bsSize="large">
                <Form onSubmit={this.submitHandler.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {i18n.t(idrole ? 'administration.editRole' : 'administration.createRole')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <Col md={4}>
                                <FieldInput name="rolename" value={rolename} onEvent={this.onEventHandler}
                                            label={i18n.t('administration.role')} required/>
                            </Col>
                            <Clearfix/>
                        </FormGroup>
                        <TypedFieldsGroup fields={rules} onEvent={this.onEventHandler}/>
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