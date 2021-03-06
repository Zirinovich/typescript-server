import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud, ICrudHeader} from '../../../_common/components/crud/crud';
import {getUsers, deleteUsers} from '../../redux/usersActions';
import {UserCreateEditModal} from './userCreateEditModal';

interface IProps {
    users: any;
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
        deleteUsers: (id) => dispatch(deleteUsers(id))
    })
)
export class UsersPage extends React.Component<IProps, IState> {
    render() {
        const {users: {list}, deleteUsers} = this.props;
        const data = list.map((a) => {
            return{
                idlogin: a.login.idlogin,
                login: a.login.login,
                rolename: a.role.rolename,
                username: a.user.username,
            }
        });
        const headers = [
            {
                name: 'idlogin',
                hidden: true,
                key:true
            },
            {
                name: 'login',
                label: i18n.t('administration.login')
            },
            {
                name: 'username',
                label: i18n.t('administration.fullName')
            },
            {
                name: 'rolename',
                label: i18n.t('administration.role')
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: UserCreateEditModal,
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: UserCreateEditModal,
                validate: {
                    isSingleRowSelected: true
                }
            },
            {
                text: i18n.t('administration.delete'),
                validate: {
                    isSelected: true,
                    confirm: true
                },
                method: (selected) => {
                    deleteUsers(selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={data} actions={actions}/>
        )
    }
}