import {LOGOUT, LOGIN_SUCCESS, ISignInAction} from './signInActions';
import {IAction} from "../../common/interfaces/IAction";
import {IUser} from "../../../shared/ajaxDto/authentication/IUser";

const initialState = null;

export function signInReducer(state: IUser = initialState, action: IAction) {
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
