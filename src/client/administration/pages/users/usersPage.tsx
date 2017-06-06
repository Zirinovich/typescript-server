import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud, ICrudHeader} from '../../../_common/components/crud/crud';
import {getUsers, getUserById, deleteUsers} from '../../redux/usersActions';
import {UserCreateEditModal} from './userCreateEditModal';

interface IProps {
    state: any;
    users: any;
    deleteUsers: any;
    getUserById: any;
}

interface IState {

}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getUsers());
    }
}])
@connect(
    (state) => ({
        state,
        users: state.users
    }),
    (dispatch) => ({
        getUserById: (id) => dispatch(getUserById(id)),
        deleteUsers: (ids) => dispatch(deleteUsers(ids))
    })
)
export class UsersPage extends React.Component<IProps, IState> {
    render() {
        const {state, users: {list}, getUserById, deleteUsers} = this.props;
        const data = list.map((a) => {
            return {
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
                key: true
            },
            {
                name: 'login',
                label: i18n.getString(state, 'administration.login')
            },
            {
                name: 'username',
                label: i18n.getString(state, 'administration.fullName')
            },
            {
                name: 'rolename',
                label: i18n.getString(state, 'administration.role')
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
                },
                method: (selected) => {
                    getUserById(_.first(selected)); //TODO: Needs realization
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