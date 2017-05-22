import {LOGIN_SUCCESS, LOGOUT_SUCCESS, ISignInAction} from './signInActions';
import {IAction} from '../../_common/interfaces/IAction';
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";

const initialState = null;

export function signInReducer(state: SessionDto = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let session = (<ISignInAction>action).signInResponse.data;
            return Object.assign({}, state, {...session});
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}
