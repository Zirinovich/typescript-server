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

interface IContentCreateEditModalState {
    id?: any;
    idcontent: string;
    contentdata: string;
}
//#endregion

@connect(
    (state) => ({contentdata: state.contentdata}),
    (dispatch) => ({
        saveContent: (content) => dispatch(saveContent(content))
    })
)
export class ContentCreateEditModal extends React.Component<IProps, IContentCreateEditModalState> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            idcontent: '',
            contentdata: ''
        }
    }

    id = generator.genId();

    componentDidUpdate() {
        const {data} = this.props;
        const {id} = this.state;
        if (data.id !== id) {
            this.setState({
                id: data.id,
                idcontent: data.idcontent,
                contentdata: data.contentdata
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

        /*var myFormData = new FormData();
        myFormData.append('pictureFile', pictureInput.files[0]);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            processData: false, // important
            contentType: false, // important
            dataType : 'json',
            data: myFormData
        });*/

        e.preventDefault();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, idcontent, contentdata} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Form onSubmit={this.submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {i18n.t(id ? 'administration.editContent' : 'administration.createContent')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FieldInput name="idcontent" label={i18n.t('administration.link')} value={idcontent}
                                        onEvent={this.onEventHandler} required/>
                        </FormGroup>
                        <FormGroup>
                            <FieldEditor name="contentdata" value={contentdata} onEvent={this.onEventHandler}/>
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