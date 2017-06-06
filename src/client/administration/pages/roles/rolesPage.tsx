import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getRoles, getRoleById, deleteRoles} from '../../redux/rolesActions';
import {IRoles} from '../../interfaces/IRoles';
import {RoleCreateEditModal} from './roleCreateEditModal';

//#region interfaces
interface IProps {
    state: any;
    roles: IRoles;
    deleteRoles: any;
    getRoleById: any;
}

interface IState {

}
//#endregion

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getRoles());
    }
}])
@connect(
    (state) => ({
        state,
        roles: state.roles
    }),
    (dispatch) => ({
        getRoleById: (idrole) => dispatch(getRoleById(idrole)),
        deleteRoles: (ids) => dispatch(deleteRoles(ids))
    })
)
export class RolesPage extends React.Component<IProps, IState> {
    render() {
        const {state, roles: {list}, getRoleById, deleteRoles} = this.props;
        const headers = [
            {
                name: 'idrole',
                hidden: true,
                key: true
            },
            {
                name: 'rolename',
                label: i18n.getString(state, 'administration.role')
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: RoleCreateEditModal,
                method: () => {
                    getRoleById();
                }
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: RoleCreateEditModal,
                validate: {
                    isSingleRowSelected: true
                },
                method: (selected) => {
                    getRoleById(_.first(selected));
                }
            },
            {
                text: i18n.t('administration.delete'),
                validate: {
                    isSelected: true,
                    confirm: true
                },
                method: (selected) => {
                    deleteRoles(selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}