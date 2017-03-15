import {LOGOUT, LOGIN_SUCCESS} from '../actions/signInActions';

const initialState = null;

export function signInReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {...action.account});
        case LOGOUT:
            return null;
        default:
            return state;
    }
}
