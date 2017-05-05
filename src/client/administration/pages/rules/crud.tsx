import * as React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Alert, Confirm} from '../../../_common/components/dialog/dialog';
import {ReactBootstrapTable} from '../../../_common/components/reactBootstrapTable/reactBootstrapTable';
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
    actions: {
        element: any;
        click: (rows: string[], setState: Function)=>void;
        Form?: any;
    }[]
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

    rowSelectHandler(selected) {
        this.setState({selected});
    }

    clearSelected() {
        this.setState({
            selected: []
        });
    }

    render() {
        const {headers, data, actions} = this.props;
        const {selected, selectedRowData, modalShow, alertShow, alertText, confirmShow, confirmText} = this.state;

        return (
            <Grid className={style.section}>
                <Row>
                    <Col md={12} className={style.buttons_wrapper}>
                        <Button bsStyle="primary">
                            {i18n.t('_common.create')}
                        </Button>
                    </Col>
                </Row>
                {
                    actions.map((action) => {
                        return React.cloneElement(action.element, {
                                onClick: function () {
                                    action.click(selected, function(state){
                                        this.setState(state);
                                    });
                                }
                            }
                        )
                    })
                }
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