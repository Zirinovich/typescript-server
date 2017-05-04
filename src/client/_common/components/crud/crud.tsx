import * as React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../tools/i18n/i18n';
import {Alert, Confirm} from '../dialog/dialog';
import {ReactBootstrapTable} from '../reactBootstrapTable/reactBootstrapTable';
const style = require('./crud.scss');

interface IModalFormProps {
    show: boolean;
    onHide: Function;
    save: Function;
    data?: any;
}

interface IModalForm extends React.ComponentClass<IModalFormProps> {

}

interface IProps {
    headers: any;
    data: any;
    save: Function;
    deleteRows: (ids: any[]) => void;
    ModalForm: IModalForm;
}

interface IState {
    modalShow: boolean;
    alertShow: boolean;
    alertText?: any;
    confirmShow: boolean;
    confirmText?: any;
    selected: any[];
    selectedRowData: any;
}

export class Crud extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            alertShow: false,
            confirmShow: false,
            selected: [],
            selectedRowData: {}
        }
    }

    addClickHandler() {
        this.setState({modalShow: true});
    }

    editClickHandler() {
        const {selected} = this.state;
        const {data} = this.props;
        if (selected.length === 1) {
            let selectedRowData = data.filter((user) => {
                return user.id === _.first(selected);
            })[0];
            this.setState({
                modalShow: true,
                selectedRowData
            });
        } else {
            this.alertShow(i18n.t('_common.chooseOneRowToEdit'));
        }
    }

    deleteClickHandler() {
        const {selected} = this.state;
        const length = selected.length;
        if (length > 0) {
            this.confirmShow(i18n.t('_common.deleteRows', {context: 'question', count: length}));
        } else {
            this.alertShow(i18n.t('_common.chooseRowsToDelete'));
        }
    }

    deleteConfirmClickHandler() {
        const {deleteRows} = this.props;
        const {selected} = this.state;
        this.clearSelected();
        this.confirmHide();
        deleteRows(selected);
    }

    rowSelectHandler(selected) {
        this.setState({selected});
    }

    clearSelected() {
        this.setState({
            selected: []
        });
    }

    modalClose() {
        this.setState({
            modalShow: false,
            selectedRowData: {}
        });
    }

    alertShow(text) {
        this.setState({
            alertShow: true,
            alertText: text
        });
    }

    alertHide() {
        this.setState({
            alertShow: false,
            alertText: ''
        });
    }

    confirmShow(text) {
        this.setState({
            confirmShow: true,
            confirmText: text
        });
    }

    confirmHide() {
        this.setState({
            confirmShow: false,
            confirmText: ''
        });
    }

    render() {
        const {headers, data, save, ModalForm} = this.props;
        const {selectedRowData, modalShow, alertShow, alertText, confirmShow, confirmText} = this.state;

        return (
            <Grid className={style.section}>
                <Row>
                    <Col md={12} className={style.buttons_wrapper}>
                        <Button bsStyle="primary" onClick={this.addClickHandler.bind(this)}>
                            {i18n.t('_common.create')}
                        </Button>
                        <Button bsStyle="primary" onClick={this.editClickHandler.bind(this)}>
                            {i18n.t('_common.edit')}
                        </Button>
                        <Button bsStyle="primary" onClick={this.deleteClickHandler.bind(this)}>
                            {i18n.t('_common.delete')}
                        </Button>

                        <ModalForm show={modalShow}
                                   onHide={this.modalClose.bind(this)}
                                   save={save}
                                   data={selectedRowData}/>
                        <Alert show={alertShow}
                               onHide={this.alertHide.bind(this)}>
                            {alertText}
                        </Alert>
                        <Confirm show={confirmShow}
                                 onHide={this.confirmHide.bind(this)}
                                 onConfirm={this.deleteConfirmClickHandler.bind(this)}>
                            {confirmText}
                        </Confirm>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ReactBootstrapTable headers={headers}
                                             data={data}
                                             rowSelectHandler={this.rowSelectHandler.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}