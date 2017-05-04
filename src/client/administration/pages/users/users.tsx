import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getUsers, saveUser, deleteUsers} from '../../redux/usersActions';
import {UserForm} from './userForm';

interface IProps {
    users: any;
    saveUser: any;
    deleteUsers: any;
}

interface IState {

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
    render() {
        const {users: {list}, saveUser, deleteUsers} = this.props;
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'username',
                label: i18n.t('administration.login')
            },
            {
                name: 'fullName',
                label: i18n.t('administration.fullName')
            },
            {
                name: 'role',
                label: i18n.t('administration.role')
            }
        ];
        return (
            <Crud headers={headers} data={list} save={saveUser} deleteRows={deleteUsers} ModalForm={UserForm}/>
        )
    }
}