import {IAction} from "../../_common/interfaces/IAction";
const formData = require('form-urlencoded');
import {SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';
import {getMD5base64} from '../../../shared/tools/index';
import {UserDto} from '../../../shared/ajaxDto/authentication/UserDto';


export const LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGOUT = 'LOGOUT_REQUEST';

export interface ISignInAction extends IAction {
    user: UserDto;
}

export function signInRequest(credentials: {username?: string, password?: string}) {
    const data = {username: credentials.username, password: getMD5base64(credentials.password)}

    return fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(data)
    })
        .then(res => res.json())
        .then((json: any) => {
            if (!json.errors) {
                return json.user;
            }
            throw new SubmissionError({...json.errors});
        })
        .catch(err => {
            if (err.name === 'SubmissionError') {
                throw err;
            }
            throw new SubmissionError({_error: err.message});
        });
}

export function signInSuccess(user, dispatch) {
    dispatch({
        type: LOGIN_SUCCESS,
        user: user
    });
    browserHistory.push('/');
}

export function logout(dispatch) {
    fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
        .then(() => dispatch({
            type: LOGOUT,
            account: null
        }));
    browserHistory.push('/login');
}
