import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Crud} from '../../../_common/components/crud/crud';
import {getRoles, deleteRoles} from '../../redux/rolesActions';
import {RoleCreateEditModal} from './roleCreateEditModal';

//#region interfaces
interface IProps {
    roles: any;
    deleteRoles: any;
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
    (state) => ({roles: state.roles}),
    (dispatch) => ({
        deleteRoles: (id) => dispatch(deleteRoles(id))
    })
)
export class RolesPage extends React.Component<IProps, IState> {
    render() {
        const {roles: {list}, deleteRoles} = this.props;
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'name',
                label: i18n.t('administration.role')
            }
        ];
        const actions = [
            {
                text: i18n.t('administration.create'),
                modalForm: RoleCreateEditModal
            },
            {
                text: i18n.t('administration.edit'),
                modalForm: RoleCreateEditModal,
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
                    deleteRoles(selected);
                }
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}