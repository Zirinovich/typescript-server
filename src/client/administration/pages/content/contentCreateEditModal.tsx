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

enum Mode {
    Create,
    Edit
}

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

    id: string = generator.genId();
    mode: Mode = Mode.Create;
    fieldNames = {
        idcontent: 'idcontent',
        filedata: 'filedata'
    };

    componentDidUpdate() {
        const {contentdata: {item}} = this.props;
        const {idcontent} = this.state;

        const lastMode = this.mode;
        this.mode = !!item ? Mode.Edit : Mode.Create;
        if ((lastMode === Mode.Edit && this.mode === Mode.Create) || (this.mode === Mode.Edit && item.idcontent !== idcontent)) {
            this.setState({
                idcontent: item ? item.idcontent : '',
                filedata: item ? item.filedata : '',
                idfile: item ? item.idfile : ''
            })
        }
    }

    formatIdcontent(idcontent: string): string {
        function upperToHyphenLower(match) {
            return match.toLowerCase();
        }

        return idcontent.replace(/[A-Z]/g, upperToHyphenLower).replace(/[^a-z0-9_]/g, '');
    }

    onEventHandler(args: EventArgsDto): void {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            let value = args.value;
            if (args.name === this.fieldNames.idcontent) {
                value = this.formatIdcontent(value);
            }
            state[args.name] = value;
            this.setState(state);
        }
    }

    submitHandler(e): void {
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
                            {i18n.t(this.mode === Mode.Create ? 'administration.createContent' : 'administration.editContent')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FieldInput name={this.fieldNames.idcontent}
                                        label={i18n.t('administration.contentName')}
                                        value={idcontent}
                                        disabled={this.mode === Mode.Edit}
                                        onEvent={this.onEventHandler}
                                        required/>
                        </FormGroup>
                        <FormGroup>
                            <FieldEditor name={this.fieldNames.filedata}
                                         value={filedata}
                                         onEvent={this.onEventHandler}/>
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