import {IAction} from '../../_common/interfaces/IAction';
import {
    GET_USERS_SUCCESS,
    GET_USER_BY_ID_SUCCESS,
} from './usersActions';
import {
    IUsers,
    IGetUsersSuccessAction,
    IGetUserByIdSuccessAction,
} from '../interfaces/IUsers';

const initialState = {
    list: []
};

export function usersReducer(state: IUsers = initialState, action: IAction) {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            const {list} = <IGetUsersSuccessAction>action;
            return Object.assign({}, state, {list});
        case GET_USER_BY_ID_SUCCESS:
            const {item} = <IGetUserByIdSuccessAction>action;
            return Object.assign({}, state, {item});
        default:
            return state;
    }
}
