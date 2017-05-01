import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';

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
                        {title ? title : 'Attention!'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}