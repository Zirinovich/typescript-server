import {IAction} from '../../_common/interfaces/IAction';
import {
    IRoles,
    IGetRolesSuccessAction,
    IGetRoleByIdSuccessAction
} from '../interfaces/IRoles';
import {GET_ROLES_SUCCESS, GET_ROLE_BY_ID_SUCCESS} from './rolesActions';

const initialState = {
    list: []
};


export function rolesReducer(state: IRoles = initialState, action: IAction) {
    switch (action.type) {
        case GET_ROLES_SUCCESS:
            const {list} = <IGetRolesSuccessAction>action;
            return Object.assign({}, state, {list});
        case GET_ROLE_BY_ID_SUCCESS:
            const {item} = <IGetRoleByIdSuccessAction>action;
            return Object.assign({}, state, {item});
        default:
            return state;
    }
}
