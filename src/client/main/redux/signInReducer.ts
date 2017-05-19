import {LOGOUT, LOGIN_SUCCESS, ISignInAction, LOGIN_ERROR} from './signInActions';
import {IAction} from '../../_common/interfaces/IAction';
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";

const initialState = null;

export function signInReducer(state: SessionDto = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let session = (<ISignInAction>action).signInResponse.data;
            return Object.assign({}, state, {...session});
        case LOGOUT:
            return null;
        case LOGIN_ERROR:
        // let {signInResponse} = <ISignInAction>action;
        //return _.cloneDeep(signInResponse.data);
        default:
            return state;
    }
}
