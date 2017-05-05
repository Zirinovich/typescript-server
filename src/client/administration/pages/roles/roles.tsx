import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');
import {Button} from 'react-bootstrap';

import {Crud} from './crud';
import {getRoles, saveRole, deleteRoles} from '../../redux/rolesActions';
import {RoleForm} from './roleForm';

interface IProps {
    roles: any;
    saveRole: any;
    deleteRoles: any;
}

interface IState {

}

@asyncConnect([{
    promise: ({store: {dispatch}}) => {
        return dispatch(getRoles());
    }
}])
@connect(
    (state) => ({roles: state.roles}),
    (dispatch) => ({
        saveRole: (user) => dispatch(saveRole(user)),
        deleteRoles: (id) => dispatch(deleteRoles(id))
    })
)
export class Rules extends React.Component<IProps, IState> {
    render() {
        const {roles: {list}} = this.props;
        const headers = [
            {
                name: 'id',
                hidden: true,
                key: true
            },
            {
                name: 'lol',
                label: 'LOL'
            },
            {
                name: 'lalala',
                label: 'Lalala'
            }
        ];

        const actions = [
            {
                element: <Button>Трус</Button>,
                click: (selected) => {
                    console.log('Трус', selected);
                }
            },
            {
                element: <Button>Балбес</Button>,
                click: (selected) => {
                    console.log('Балбес', selected);
                }
            },
            {
                element: <Button>Бывалый</Button>,
                click: (selected) => {
                    console.log('Бывалый', selected);
                },
                Form: RoleForm
            }
        ];
        return (
            <Crud headers={headers} data={list} actions={actions}/>
        )
    }
}