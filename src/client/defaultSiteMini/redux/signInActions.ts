import {IAction} from "../../../shared/interfaces/defaultModule/IAction";
const formData = require('form-urlencoded');
import {SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';
import {IUser} from "../../../shared/interfaces/authentication/IUser";

export const LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGOUT = 'LOGOUT_REQUEST';

export interface ISignInAction extends IAction {
    account: IUser;
}

export function signInRequest(credentials) {
    return fetch('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData(credentials)
    })
        .then(res => res.json())
        .then((json: any) => {
            if (!json.errors) {
                return json.account;
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
        account: user
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
