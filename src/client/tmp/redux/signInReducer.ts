import {LOGOUT, LOGIN_SUCCESS, ISignInAction} from './signInActions';
import {IAction} from "../../_common/interfaces/IAction";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";

const initialState = null;

export function signInReducer(state: UserDto = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let {user} = <ISignInAction>action;
            return Object.assign({}, state, {...user});
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
