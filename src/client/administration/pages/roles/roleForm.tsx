import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Button, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {saveRole} from '../../redux/rolesActions';

interface IProps {
    show: boolean;
    onHide: any;
    data?: any;
    saveRole?: any;
}

interface IState {
    id?: any;
    name?: string;
}

@connect(
    (state) => ({roles: state.roles}),
    (dispatch) => ({
        saveRole: (role) => dispatch(saveRole(role))
    })
)
export class RoleForm extends React.Component<IProps, IState> {
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
            this.setState({
                id: data.id,
                name: data.name
            });
        }
    }

    nameChangeHandler(e) {
        this.setState({
            name: e.target.value
        });
    }

    saveClickHandler() {
        const {saveRole, onHide} = this.props;
        saveRole(this.state);
        onHide();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, name} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {id ? i18n.t('administration.editRole') : i18n.t('administration.createRole')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <ControlLabel>{i18n.t('administration.role')}</ControlLabel>
                            <FormControl
                                type="text"
                                value={name}
                                onChange={this.nameChangeHandler.bind(this)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary"
                            onClick={this.saveClickHandler.bind(this)}>{i18n.t('administration.save')}</Button>
                    <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}