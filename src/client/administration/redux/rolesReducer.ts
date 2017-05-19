import {GET_ROLES_SUCCESS, IGetRolesSuccessAction} from './rolesActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: any[];
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
