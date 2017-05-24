import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, Row, Col, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
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

    id = generator.genId();

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

    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        const {saveUser, onHide} = this.props;
        saveUser(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, login, password, username} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title id={this.id}>
                            {id ? i18n.t('administration.editUser') : i18n.t('administration.createUser')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={4}>
                                <FieldInput
                                    name="login"
                                    label={i18n.t('administration.login')}
                                    value={login}
                                    onEvent={this.onEventHandler}
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <FieldInput
                                    name="password"
                                    label={i18n.t('administration.password')}
                                    value={password}
                                    onEvent={this.onEventHandler}
                                />
                            </Col>
                            <Col md={4}>
                                <FieldInput
                                    name="username"
                                    label={i18n.t('administration.fullName')}
                                    value={username}
                                    onEvent={this.onEventHandler}
                                />
                            </Col>
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