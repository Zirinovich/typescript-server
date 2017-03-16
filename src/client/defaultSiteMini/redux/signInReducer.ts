import {LOGOUT, LOGIN_SUCCESS, ISignInAction} from './signInActions';
import {IAction} from "../../../shared/interfaces/defaultModule/IAction";
import {IUser} from "../../../shared/interfaces/authentication/IUser";

const initialState = null;

export function signInReducer(state: IUser = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let {account} = <ISignInAction>action;
            return Object.assign({}, state, {...account});
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
