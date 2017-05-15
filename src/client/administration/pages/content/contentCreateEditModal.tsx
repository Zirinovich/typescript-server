import * as React from 'react';
const {connect} = require('react-redux');
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import {generator} from '../../../../shared/tools/generator';
import {Tinymce} from '../../../_common/components/tinymce/tinymce';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {saveRole} from '../../redux/contentActions';

//#region interfaces
interface IProps {
    show: boolean;
    onHide: any;
    data?: any;
    saveRole: any;
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
        saveRole: (user) => dispatch(saveRole(user))
    })
)
export class ContentCreateEditModal extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            link: '',
            datetime: '',
            content: ''
        }
    }

    id = generator.genId();

    componentDidUpdate() {
        const {data} = this.props;
        console.log('componentDidUpdate', data);
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

    saveClickHandler() {
        const {saveRole, onHide} = this.props;
        saveRole(this.state);
        onHide();
    }

    render() {
        const {show, onHide} = this.props;
        const {id, link, datetime, content} = this.state;
        return (
            <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby={this.id}>
                <Modal.Header closeButton>
                    <Modal.Title id={this.id}>
                        {i18n.t(id ? 'administration.editRole' : 'administration.createRole')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <ControlLabel>{i18n.t('administration.link')}</ControlLabel>
                        <FormControl type="text" value={link}/>
                    </FormGroup>
                    <FormGroup>
                        <Tinymce/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.saveClickHandler.bind(this)}>{i18n.t('administration.save')}</Button>
                    <Button onClick={onHide}>{i18n.t('administration.close')}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}