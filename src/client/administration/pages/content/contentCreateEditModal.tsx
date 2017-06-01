import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Form, Button, FormGroup} from 'react-bootstrap';

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
    contentdata?: any;
    saveContent: any;
}

interface IState {
    idcontent: string;
    filedata: string;
    idfile?: string;
}
//#endregion

@connect(
    (state) => ({contentdata: state.contentdata}),
    (dispatch) => ({
        saveContent: (content) => dispatch(saveContent(content))
    })
)
export class ContentCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            idcontent: '',
            filedata: ''
        }
    }

    id = generator.genId();

    componentDidUpdate() {
        const {contentdata: {item}} = this.props;
        const {idcontent} = this.state;

        if (item && item.idcontent !== idcontent) {
            this.setState({
                idcontent: item.idcontent,
                filedata: item.filedata,
                idfile: item.idfile
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
        const {idcontent, filedata} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {i18n.t(idcontent ? 'administration.editContent' : 'administration.createContent')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FieldInput name="idcontent" label={i18n.t('administration.link')} value={idcontent}
                                        onEvent={this.onEventHandler} required/>
                        </FormGroup>
                        <FormGroup>
                            <FieldEditor name="filedata" value={filedata} onEvent={this.onEventHandler}/>
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