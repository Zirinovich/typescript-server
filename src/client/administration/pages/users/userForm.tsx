import * as React from 'react';
import {Modal, Button, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {UserRoleEnum} from '../../../../shared/ajaxDto/authentication/UserRoleEnum';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {saveUser} from '../../redux/usersActions';

import {generator} from '../../../../shared/tools/generator';

interface IProps {
    show: boolean;
    onHide: any;
    saveUser: any;
    id?: any;
    fullName?: string;
    username?: string;
}

interface IState {
    id?: any;
    fullName: string;
    username: string;
    password: string;
    role: number;
}

export class UserForm extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            username: '',
            password: '',
            role: 1
        }
    }

    id = generator.genId();

    componentDidUpdate() {
        const {id, fullName, username} = this.props;
        if (id !== this.state.id) {
            this.setState({
                id: id,
                fullName: fullName,
                username: username
            });
        }
    }

    usernameChangeHandler(e) {
        this.setState({
            username: e.target.value
        });
    }

    passwordChangeHandler(e) {
        this.setState({
            password: e.target.value
        });
    }

    fullNameChangeHandler(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    saveClickHandler() {
        const {saveUser, onHide} = this.props;
        saveUser(this.state);
        onHide();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, username, password, fullName} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {id ? i18n.t('administration.addUser') : i18n.t('administration.addUser')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <ControlLabel>{i18n.t('administration.login')}</ControlLabel>
                            <FormControl
                                type="text"
                                value={username}
                                onChange={this.usernameChangeHandler.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <ControlLabel>{i18n.t('administration.password')}</ControlLabel>
                            <FormControl
                                type="text"
                                value={password}
                                onChange={this.passwordChangeHandler.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <ControlLabel>{i18n.t('administration.fullName')}</ControlLabel>
                            <FormControl
                                type="text"
                                value={fullName}
                                onChange={this.fullNameChangeHandler.bind(this)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveClickHandler.bind(this)}>{i18n.t('administration.save')}</Button>
                    <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}