import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';

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
                        {title ? title : 'Confirm action'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onConfirm}>Yes</Button>
                    <Button onClick={onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}