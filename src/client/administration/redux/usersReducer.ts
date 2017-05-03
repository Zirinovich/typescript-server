import {GET_USERS_SUCCESS, IGetUsersSuccessAction} from './usersActions';
import {IAction} from '../../_common/interfaces/IAction';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

interface IState {
    list: IUserDto[];
}

const initialState = {
    list: []
};


export function usersReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            const {list} = <IGetUsersSuccessAction>action;
            return Object.assign({}, state, {list});
        default:
            return state;
    }
}
