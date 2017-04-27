import * as React from 'react';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {ReactBootstrapTable} from '../../../common/components/reactBootstrapTable/reactBootstrapTable';
import {UserForm} from './userForm';
const style = require('./users.scss');

interface IProps {

}

interface IState {
    modalShow: boolean;
    currentUser?: {

    }
}

export class Users extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        };
    }

    render() {
        const headers = [
            {
                name: 'id',
                label: 'ID',
                key: true
            },
            {
                name: 'name',
                label: 'User Name'
            },
            {
                name: 'money',
                label: 'User Money'
            }
        ];

        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                name: 'user ' + i,
                money: i * 100500
            });
        }

        let modalClose = () => this.setState({modalShow: false});
        return (
            <Grid className={style.section}>
                <Row>
                    <Col md={12} className={style.buttons_wrapper}>
                        <Button bsStyle="primary" onClick={()=>this.setState({ modalShow: true, currentUser: null })}>
                            Add
                        </Button>
                        <Button bsStyle="primary" onClick={()=>this.setState({
                            modalShow: true,
                            currentUser: {login: 'vasya', password: '123456'} })}>
                            Edit
                        </Button>
                        <Button bsStyle="primary">Delete</Button>

                        <UserForm show={this.state.modalShow} onHide={modalClose}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ReactBootstrapTable headers={headers} data={data}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}