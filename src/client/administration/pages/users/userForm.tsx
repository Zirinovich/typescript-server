import * as React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';

interface IProps {
    show: boolean;
    onHide: any;
}

interface IState {
    id?: number;
    name?: string;
    login?: string;
    password?: string;
}

export class UserForm extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    id = generator.genId();

    loginChangeHandler(e){
        this.setState({
           login: e.target.value
        });
    }

    passwordChangeHandler(e){
        this.setState({
            password: e.target.value
        });
    }

    nameChangeHandler(e){
        this.setState({
            name: e.target.value
        });
    }

    saveClickHandler(){
        console.log(this.state);
    }

    render() {
        const {show, onHide} = this.props;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        Add User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <label>
                            <span>
                                Login
                            </span>
                                <input type="text"
                                       value={this.state.login}
                                       onChange={this.loginChangeHandler.bind(this)}/>
                            </label>
                        </Col>
                        <Col md={4}>
                            <label>
                            <span>
                                Password
                            </span>
                                <input type="password"
                                       value={this.state.password}
                                       onChange={this.passwordChangeHandler.bind(this)}/>
                            </label>
                        </Col>
                        <Col md={4}>
                            <label>
                            <span>
                                Name
                            </span>
                                <input type="text"
                                       value={this.state.name}
                                       onChange={this.nameChangeHandler.bind(this)}/>
                            </label>
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