import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../tools/i18n/i18n';

interface IProps {
    show: boolean;
    onHide: any;
    title?: string;
}

interface IState {

}

export class Alert extends React.Component<IProps, IState> {
    id = generator.genId();

    render() {
        const {show, onHide, title, children} = this.props;
        return (
            <Modal show={show} onHide={onHide} aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {title ? title : i18n.t('_common.attention')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>{i18n.t('_common.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}