import * as React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Alert, Confirm} from '../../../_common/components/dialog/dialog';
import {ReactBootstrapTable} from '../../../_common/components/reactBootstrapTable/reactBootstrapTable';
const style = require('./crud.scss');

interface IModalFormProps {
    show: boolean;
    onHide: Function;
    data?: any;
}

interface IModalForm extends React.ComponentClass<IModalFormProps> {

}

interface IProps {
    headers: any;
    data: any;
    actions: {
        text: any;
        modalForm?: IModalForm;
        validate?: {
            isSelected?: boolean;
            isSingleRowSelected?: boolean;
            confirm?: boolean;
        };
        method?: (selected: any[])=>void;
    }[];
}

interface IState {
    modalsShow: boolean[];
    alertShow: boolean;
    alertText?: any;
    confirmShow: boolean;
    confirmText?: any;
    confirmMethod?: Function;
    selected: any[];
    key: string;
    selectedRowData: any;
}

export class Crud extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            modalsShow: props.actions.map(() => {
                return false;
            }),
            alertShow: false,
            confirmShow: false,
            selected: [],
            key: props.headers.filter(header => header.key)[0].name,
            selectedRowData: {}
        }
    }

    componentDidUpdate() {
        const {data} = this.props;
        const {selected, key} = this.state;
        const dataKeys = data.map((item) => {
            return item[key];
        });
        const actualSelected = selected.filter((selectedKey) => {
            return dataKeys.indexOf(selectedKey) !== -1;
        });

        if(selected.length !== actualSelected.length){
            this.setState({
                selected: actualSelected
            });
        }
    }

    rowSelectHandler(selected) {
        this.setState({selected});
    }

    clearSelected() {
        this.setState({
            selected: []
        });
    }

    setModalShow(index, value) {
        let {modalsShow} = this.state;
        modalsShow[index] = value;
        this.setState({
            modalsShow
        });
    }

    actionClickHandler(index) {
        const {actions, data} = this.props;
        const {selected, key} = this.state;
        const action = actions[index];
        const setModalShow = this.setModalShow.bind(this);

        function method() {
            if (action.modalForm) setModalShow(index, true);
            if (action.method) action.method(selected);
        }

        if (action.validate) {
            if (action.validate.isSelected) {
                if (selected.length === 0) {
                    this.alertShow(i18n.t('_common.chooseRows'));
                    return;
                }
            }
            if (action.validate.isSingleRowSelected) {
                if (selected.length === 1) {
                    let selectedRowData = data.filter((item) => {
                        return item[key] === _.first(selected);
                    })[0];
                    this.setState({
                        selectedRowData
                    });
                } else {
                    this.alertShow(i18n.t('_common.chooseOneRow'));
                    return;
                }
            }
            if (action.validate.confirm) {
                this.setState({
                    confirmMethod: method
                });
                this.confirmShow(i18n.t('_common.deleteRows', {context: 'question', count: selected.length}));
                return;
            }
        }
        method();
    }

    modalClose(index) {
        this.setState({
            selectedRowData: {}
        });
        this.setModalShow(index, false);
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

    confirmClickHandler() {
        const {confirmMethod} = this.state;
        if (confirmMethod) confirmMethod();
        this.confirmHide();
    }

    render() {
        const {headers, data, actions} = this.props;
        const {selectedRowData, modalsShow, alertShow, alertText, confirmShow, confirmText} = this.state;

        const actionClickHandler = this.actionClickHandler.bind(this);
        const modalClose = this.modalClose.bind(this);
        return (
            <Grid className={style.section}>
                <Row>
                    <Col md={12} className={style.buttons_wrapper}>
                        {
                            actions.map((action, index) => {
                                const ModalForm = action.modalForm;
                                return (
                                    <span key={index}>
                                        <Button bsStyle="primary" onClick={() => actionClickHandler(index)}>
                                            {action.text}
                                        </Button>
                                        {ModalForm &&
                                        <ModalForm show={modalsShow[index]} onHide={() => modalClose(index)}
                                                   data={selectedRowData}/>}
                                    </span>
                                )
                            })
                        }
                        <Alert show={alertShow}
                               onHide={this.alertHide.bind(this)}>
                            {alertText}
                        </Alert>
                        <Confirm show={confirmShow}
                                 onHide={this.confirmHide.bind(this)}
                                 onConfirm={this.confirmClickHandler.bind(this)}>
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