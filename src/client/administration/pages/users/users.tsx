import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {ReactBootstrapTable} from '../../../common/components/reactBootstrapTable/reactBootstrapTable';
import {getUsers} from '../../redux/usersActions';
import {UserForm} from './userForm';
const style = require('./users.scss');

interface IProps {
    users: any;
}

interface IState {
    modalShow: boolean;
    selected: any[];
    currentUser: {
        id?: number;
        name?: string;
        login?: string;
        password?: string;
    }
}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getUsers());
    }
}])
@connect(
    (state) => ({users: state.users})
)
export class Users extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            selected: [],
            currentUser: {}
        }
    }

    addClickHandler() {
        this.setState({modalShow: true, currentUser: {}});
    }

    editClickHandler() {
        const {selected} = this.state;
        console.log('selected', selected);
        if(selected.length === 1){
            this.setState({
                modalShow: true,
                currentUser: _.first(selected)
            });
        }
    }

    rowSelectHandler(selected) {
        console.log('setState', selected);
        this.setState({selected});
    }

    render() {
        const {users} = this.props;

        const headers = [
            {
                name: 'id',
                label: 'ID',
                key: true
            },
            {
                name: 'username',
                label: 'Login'
            },
            {
                name: 'fullName',
                label: 'User Name'
            },
            {
                name: 'role',
                label: 'Role'
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
                        <Button bsStyle="primary" onClick={this.addClickHandler.bind(this)}>
                            Add
                        </Button>
                        <Button bsStyle="primary" onClick={this.editClickHandler.bind(this)}>
                            Edit
                        </Button>
                        <Button bsStyle="primary">Delete</Button>

                        <UserForm show={this.state.modalShow}
                                  onHide={modalClose}
                                  id={this.state.currentUser.id}
                                  login={this.state.currentUser.login}
                                  password={this.state.currentUser.password}
                                  name={this.state.currentUser.name}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ReactBootstrapTable headers={headers}
                                             data={users.list}
                                             rowSelectHandler={this.rowSelectHandler.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}