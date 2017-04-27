import * as React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';

interface IProps {
    show: boolean;
    onHide: any;
    header: any;
    buttons?: JSX.Element[]
}

interface IState {

}

export class ReactBootstrapModal extends React.Component<IProps, IState> {
    id = generator.genId();

    render() {
        const {show, onHide, header, buttons, children} = this.props;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    {buttons && buttons.map((button) => {
                        return (button);
                    })}
                    <Button onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}