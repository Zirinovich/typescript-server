import {LOGOUT, LOGIN_SUCCESS, ISignInAction, LOGIN_ERROR} from './signInActions';
import {IAction} from '../../_common/interfaces/IAction';
import {UserDto} from '../../../shared/ajaxDto/authentication/UserDto';

const initialState = null;

export function signInReducer(state: UserDto = initialState, action: IAction) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            let session = (<ISignInAction>action).signInResponse.data;
            return Object.assign({}, state, {session});
        case LOGIN_ERROR:
        // let {signInResponse} = <ISignInAction>action;
        //return _.cloneDeep(signInResponse.data);
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
