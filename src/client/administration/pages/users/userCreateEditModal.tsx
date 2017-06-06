import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, Row, FormGroup, Col, Clearfix} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
import {FieldSelect} from '../../../_common/components/fieldSelect/fieldSelect';
import {EventArgsDto} from '../../../_common/interfaces/EventArgsDto';
import {EventMethodEnum} from '../../../_common/interfaces/EventMethodEnum';
import {saveUser} from '../../redux/usersActions';

//#region interfaces
interface IProps {
    show: boolean;
    onHide: any;
    saveUser: any;
    data?: any;
}

interface IState {
    id?: any;
    login: string;
    username: string;
    password: string;
    role: number;
}
//#endregion

@connect(
    (state) => ({users: state.users}),
    (dispatch) => ({
        saveUser: (user) => dispatch(saveUser(user))
    })
)
export class UserCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            login: '',
            username: '',
            password: '',
            role: 1
        }
    }

    fieldNames = {
        id: 'id',
        login: 'login',
        password: 'password',
        username: 'username',
        role: 'role'
    };

    componentDidUpdate() {
        const {data} = this.props;
        const {id} = this.state;
        if (data.id !== id) {
            this.setState({
                id: data.id,
                login: data.login,
                username: data.username
            });
        }
    }

    formatLogin(idcontent: string): string {
        function upperToHyphenLower(match) {
            return match.toLowerCase();
        }

        return idcontent.replace(/[A-Z]/g, upperToHyphenLower).replace(/[^a-z0-9@._]/g, '');
    }

    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            let value = args.value;
            if (args.name === this.fieldNames.login) {
                value = this.formatLogin(value);
            }
            state[args.name] = value;
            this.setState(state);
        }
    }

    submitHandler(e): void {
        const {saveUser, onHide} = this.props;
        saveUser(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, login, password, username} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large">
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {i18n.t(id ? 'administration.editUser' : 'administration.createUser')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <FormGroup>
                                <Col md={6}>
                                    <FieldInput
                                        name={this.fieldNames.login}
                                        label={i18n.t('administration.login')}
                                        value={login}
                                        onEvent={this.onEventHandler}
                                        required
                                    />
                                </Col>
                                <Col md={6}>
                                    <FieldInput
                                        name={this.fieldNames.password}
                                        type="password"
                                        label={i18n.t('administration.password')}
                                        value={password}
                                        onEvent={this.onEventHandler}
                                    />
                                </Col>
                                <Clearfix/>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Col md={6}>
                                    <FieldInput
                                        name={this.fieldNames.username}
                                        label={i18n.t('administration.fullName')}
                                        value={username}
                                        onEvent={this.onEventHandler}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FieldSelect
                                        name={this.fieldNames.role}
                                        label={i18n.t('administration.role')}
                                    />
                                </Col>
                                <Clearfix/>
                            </FormGroup>
                        </Row>
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