import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../tools/i18n/i18n';

interface IProps {
    show: boolean;
    onHide: any;
    onConfirm: any;
    title?: string;
}

interface IState {

}

export class Confirm extends React.Component<IProps, IState> {
    id = generator.genId();

    render() {
        const {show, onHide, onConfirm, title, children} = this.props;
        return (
            <Modal show={show} onHide={onHide} aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {title ? title : i18n.t('_common.confirmAction')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={onConfirm}>{i18n.t('_common.ok')}</Button>
                    <Button onClick={onHide}>{i18n.t('_common.cancel')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}