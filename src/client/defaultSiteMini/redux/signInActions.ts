import {IAction} from "../../../shared/interfaces/common/IAction";
//import {SubmissionError} from 'redux-form';
import {browserHistory} from 'react-router';
import {getMD5base64} from '../../../shared/tools/index';
import {IUser} from '../../../shared/interfaces/authentication/IUser';
import {Core} from '../../../shared/classes/core';


export const LOGIN_SUCCESS = 'LOGIN_REQUEST_FINISHED',
    LOGOUT = 'LOGOUT_REQUEST';

export interface ISignInAction extends IAction {
    user: IUser;
}

export function signInRequest(credentials: {username?: string, password?: string}) {
    const data = {username: credentials.username, password: getMD5base64(credentials.password)};
    var y = Core.postAsync({url:'/api/login', data:data}).then(response=>{
        console.log(response);
    });
    return y;
    /*
        .then(json => {
            if (!json.errors) {
                return json.user;
            }
            throw new SubmissionError({...json.errors});
        })
        .catch(error => {
            if (error.name === 'SubmissionError') {
                throw error;
            }
            throw new SubmissionError({_error: error.message});
        });
        */
}

export function signInSuccess(user, dispatch) {
    dispatch({
        type: LOGIN_SUCCESS,
        user: user
    });
    browserHistory.push('/');
}

export function logout(dispatch) {
    dispatch({
        type: LOGOUT,
        account: null
    })
    /*
    Core.POSTAsync('/api/logout')
        .then(() => dispatch({
            type: LOGOUT,
            account: null
        }));
    browserHistory.push('/login');
    */
}
