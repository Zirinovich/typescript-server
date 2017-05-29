import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, FormGroup, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {FieldEditor} from '../../../_common/components/fieldEditor/fieldEditor';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {FieldInput} from '../../../_common/components/fieldInput/fieldInput';
import {EventArgsDto} from '../../../_common/interfaces/EventArgsDto';
import {EventMethodEnum} from '../../../_common/interfaces/EventMethodEnum';
import {saveContent} from '../../redux/contentActions';

//#region interfaces
interface IProps {
    show: boolean;
    onHide: any;
    data?: any;
    saveContent: any;
}

interface IState {
    id?: any;
    link: string;
    datetime: string;
    content: string;
}
//#endregion

@connect(
    (state) => ({users: state.users}),
    (dispatch) => ({
        saveContent: (user) => dispatch(saveContent(user))
    })
)
export class ContentCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            link: '',
            datetime: '',
            content: ''
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
                datetime: data.datetime,
                content: data.content
            });
        }
    }

    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        const {saveContent, onHide} = this.props;
        saveContent(this.state);
        onHide();
        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, link, content} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title id={this.id}>
                            {i18n.t(id ? 'administration.editContent' : 'administration.createContent')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FieldInput name="link" label={i18n.t('administration.link')} value={link}
                                        onEvent={this.onEventHandler} required/>
                        </FormGroup>
                        <FormGroup>
                            <FieldEditor name="content" value={content} onEvent={this.onEventHandler}/>
                        </FormGroup>
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