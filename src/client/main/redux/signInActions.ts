import {browserHistory} from 'react-router';

import {IAction} from '../../_common/interfaces/IAction';
import {getMD5base64} from '../../../shared/tools/index';
import {Core} from '../../../shared/classes/core';
import {IAjaxResponse} from '../../../shared/ajaxDto/IAjaxResponse';
import {SessionDto} from '../../../shared/ajaxDto/authentication/SessionDto';
import {ErrorCodeEnum} from '../../../shared/classes/ErrorCodeEnum';

export const LOGIN_SUCCESS = 'signIn/LOGIN_REQUEST_SUCCESS',
    LOGIN_FAILED = 'signIn/LOGIN_REQUEST_FAILED',
    LOGOUT_SUCCESS = 'signIn/LOGOUT_SUCCESS',
    LOGOUT_FAILED = 'signIn/LOGOUT_FAILED';

export interface ISignInAction extends IAction {
    signInResponse: IAjaxResponse<SessionDto>;
}

export function signInRequest(credentials: {login?: string, password?: string}) {
    return async(dispatch) => {
        const data = {login: credentials.login, password: getMD5base64(credentials.password)};

        let response = await Core.postAsync<SessionDto>({
            url: '/api/login',
            data,
        });

        if (response.errorCode === ErrorCodeEnum.NoErrors) {
            browserHistory.push('/');
            dispatch(signInSuccess(response));
        }
        else {
            dispatch(signInError(response));
        }
    };
}

export function signInSuccess(response: IAjaxResponse<SessionDto>) {
    return {
        type: LOGIN_SUCCESS,
        signInResponse: response
    };
}

export function signInError(response: IAjaxResponse<SessionDto>) {
    return {
        type: LOGIN_FAILED,
        signInResponse: response
    };
}

export function logout() {
    return async(dispatch) => {
        let response = await Core.postAsync<SessionDto>({
            url: 'api/logout'
        });

        if (response.errorCode === ErrorCodeEnum.NoErrors) {
            browserHistory.push('/login');
            dispatch(logoutSuccess(response));
        }
        else {
            dispatch(logoutError(response));
        }
    };
}

export function logoutSuccess(response: IAjaxResponse<SessionDto>) {
    return {
        type: LOGOUT_SUCCESS,
        signInResponse: response
    };
}

export function logoutError(response: IAjaxResponse<SessionDto>) {
    return {
        type: LOGOUT_FAILED,
        signInResponse: response
    };
}