import {GET_ROLES_SUCCESS, IGetRolesSuccessAction} from './rolesActions';
import {IAction} from '../../_common/interfaces/IAction';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

interface IState {
    list: IUserDto[];
}

const initialState = {
    list: []
};


export function rolesReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_ROLES_SUCCESS:
            const {list} = <IGetRolesSuccessAction>action;
            return Object.assign({}, state, {list});
        default:
            return state;
    }
}
