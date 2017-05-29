import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, FormGroup, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldFile} from '../../../_common/components/fieldFile/fieldFile';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
import {EventArgsDto} from '../../../_common/interfaces/EventArgsDto';
import {EventMethodEnum} from '../../../_common/interfaces/EventMethodEnum';
import {saveFile} from '../../redux/filesActions';

//#region interfaces
interface IProps {
    show: boolean;
    onHide: any;
    data?: any;
    saveFile: any;
}

interface IState {
    id?: any;
    link: string;
    name: string;
}
//#endregion

@connect(
    (state) => ({users: state.users}),
    (dispatch) => ({
        saveFile: (user) => dispatch(saveFile(user))
    })
)
export class FileCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            link: '',
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
                link: data.link,
                name: data.content
            });
        }
    }

    onEventHandler(args: EventArgsDto) {
        console.log(args);
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        const {saveFile, onHide} = this.props;
        saveFile(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, link, name} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form method="post" action="/api/main/content/upload">
                    <Modal.Header closeButton>
                        <Modal.Title id={this.id}>
                            {i18n.t(id ? 'administration.editContent' : 'administration.createContent')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FieldFile name="link" onEvent={this.onEventHandler}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit">{i18n.t('administration.save')}</Button>
                        <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}