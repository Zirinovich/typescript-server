import {browserHistory} from 'react-router';

import {IAction} from "../../_common/interfaces/IAction";
import {getMD5base64} from '../../../shared/tools/index';
import {Core, HttpMethod} from "../../../shared/classes/core";
import {IAjaxResponse} from "../../../shared/ajaxDto/IAjaxResponse";
import Session = Express.Session;
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";

export const LOGIN_SUCCESS = 'signIn/LOGIN_REQUEST_FINISHED',
    LOGIN_ERROR = 'signIn/LOGIN_REQUEST_FAILED',
    LOGOUT = 'signIn/LOGOUT_REQUEST';

export interface ISignInAction extends IAction {
    signInResponse: IAjaxResponse<SessionDto>;
}

export function signInRequest(credentials: {login?: string, password?: string}) {
    return async(dispatch) => {
        const data = {login: credentials.login, password: getMD5base64(credentials.password)};

        let response = await Core.postAsync<SessionDto>({
            url: "api/login",
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
        type: LOGIN_ERROR,
        signInResponse: response
    };
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
