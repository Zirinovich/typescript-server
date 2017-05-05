import * as React from 'react';
import {Modal, Button, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../../_common/tools/i18n/i18n';

interface IProps {
    show: boolean;
    onHide: any;
}

interface IState {

}

export class RoleForm extends React.Component<IProps, IState> {
    id = generator.genId();

    render(){
        const {show, onHide} = this.props;
        return(
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        Lalala
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    LOL
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary">{i18n.t('administration.save')}</Button>
                    <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}