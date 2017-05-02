import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {ReactBootstrapTable} from '../../../_common/components/reactBootstrapTable/reactBootstrapTable';
import {Alert, Confirm} from '../../../_common/components/dialog/dialog';
import {getUsers, saveUser, deleteUsers} from '../../redux/usersActions';
import {UserForm} from './userForm';
import {IUserDto} from '../../../../shared/ajaxDto/authentication/IUserDto';
const style = require('./users.scss');

interface IProps {
    users: any;
    saveUser: any;
    deleteUsers: any;
}

interface IState {
    modalShow: boolean;
    alertShow: boolean;
    alertText?: any;
    confirmShow: boolean;
    confirmText?: any;
    selected: any[];
    selectedUser?: IUserDto
}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getUsers());
    }
}])
@connect(
    (state) => ({users: state.users}),
    (dispatch) => ({
        saveUser: (user) => dispatch(saveUser(user)),
        deleteUsers: (id) => dispatch(deleteUsers(id))
    })
)
export class Users extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            alertShow: false,
            confirmShow: false,
            selected: []
        }
    }

    addClickHandler() {
        this.setState({modalShow: true});
    }

    editClickHandler() {
        const {selected} = this.state;
        const {users:{list}} = this.props;
        if (selected.length === 1) {
            let selectedUser = list.filter((user) => {
                return user.id === _.first(selected);
            })[0];
            this.setState({
                modalShow: true,
                selectedUser
            });
        } else {
            this.alertShow('Choose one row to edit');
        }
    }

    deleteClickHandler() {
        const {selected} = this.state;
        const length = selected.length;
        if (length > 0) {
            this.confirmShow('Delete ' + length + ' rows?');
        } else {
            this.alertShow('Choose rows to delete');
        }
    }

    deleteConfirmClickHandler() {
        const {deleteUsers} = this.props;
        const {selected} = this.state;
        this.clearSelected();
        this.confirmHide();
        deleteUsers(selected);
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
            selectedUser: null
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
        const {users, saveUser} = this.props;
        const {selectedUser, modalShow, alertShow, alertText, confirmShow, confirmText} = this.state;
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
                        <Button bsStyle="primary" onClick={this.deleteClickHandler.bind(this)}>
                            Delete
                        </Button>

                        <UserForm show={modalShow}
                                  onHide={this.modalClose.bind(this)}
                                  saveUser={saveUser}
                                  id={selectedUser ? selectedUser.id : ''}
                                  username={selectedUser ? selectedUser.username : ''}
                                  fullName={selectedUser ? selectedUser.fullName : ''}/>
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
                                             data={users.list}
                                             rowSelectHandler={this.rowSelectHandler.bind(this)}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}