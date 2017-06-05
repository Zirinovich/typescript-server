import {
    GET_USERS_SUCCESS,
    GET_USER_BY_ID_SUCCESS,
    IGetUsersSuccessAction,
    IGetUserByIdSuccessAction
} from './usersActions';
import {IAction} from '../../_common/interfaces/IAction';
import {AccountDto} from '../../../shared/ajaxDto/authentication/AccountDto';

interface IState {
    list: AccountDto[];
    item?: AccountDto;
}

const initialState = {
    list: []
};


export function usersReducer(state: IState = initialState, action: IAction) {
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
