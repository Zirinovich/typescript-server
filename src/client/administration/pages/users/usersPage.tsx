import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud, ICrudHeader} from '../../../_common/components/crud/crud';
import {getUsers, deleteUsers} from '../../redux/usersActions';
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
        deleteUsers: (id) => dispatch(deleteUsers(id))
    })
)
export class Users extends React.Component<IProps, IState> {
    render() {
        const {users: {list}, saveUser, deleteUsers} = this.props;
        let headers:ICrudHeader[] = [
            {
                name: 'id',
                hidden: true,
                key:true
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
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: UserForm,
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: UserForm,
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
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}