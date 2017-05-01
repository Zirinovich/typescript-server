import * as React from 'react';
import {Modal, Button, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';

interface IProps {
    show: boolean;
    onHide: any;
    id?: any;
    fullName?: string;
    username?: string;
}

interface IState {
    id?: any;
    fullName?: string;
    username?: string;
    password?: string;
}

export class UserForm extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    id = generator.genId();

    componentDidUpdate() {
        const {id, fullName, username} = this.props;
        if (id !== this.state.id) {
            this.setState({
                id: id,
                fullName: fullName,
                username: username,
                password: ''
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
        console.log(this.state);
    }

    render() {
        const {show, onHide} = this.props;
        const {id, username, password, fullName} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {id ? 'Edit user' : 'Add user'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <ControlLabel>Login</ControlLabel>
                            <FormControl
                                type="text"
                                value={username}
                                onChange={this.usernameChangeHandler.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="text"
                                value={password}
                                onChange={this.passwordChangeHandler.bind(this)}
                            />
                        </Col>
                        <Col md={4}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={fullName}
                                onChange={this.fullNameChangeHandler.bind(this)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveClickHandler.bind(this)}>Save</Button>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}