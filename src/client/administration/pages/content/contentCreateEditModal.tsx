import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Button, FormGroup, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {Tinymce} from '../../../_common/components/tinymce/tinymce';
import {i18n} from '../../../_common/tools/i18n/i18n';

interface IProps {
    show: boolean;
    onHide: any;
    data?: any;
}

interface IState {

}

export class ContentCreateEditModal extends React.Component<IProps, IState> {
    id = generator.genId();

    render() {
        const {show, onHide} = this.props;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        LOL
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>{i18n.t('administration.link')}</ControlLabel>
                        <FormControl type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Tinymce/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}