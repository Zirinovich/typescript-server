import {IAction} from '../../_common/interfaces/IAction';
import {IAccountDto} from '../../../server/_interfaces/engine/dto/IAccountDto';
import {Core} from '../../../shared/classes/core';
import {LoginDto} from '../../../shared/ajaxDto/authentication/LoginDto';
import {ErrorCodeEnum} from '../../../shared/classes/ErrorCodeEnum';

export const GET_USERS_REQUEST: string = 'users/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS: string = 'users/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE: string = 'users/GET_USERS_FAILURE';
export const SAVE_USER_REQUEST: string = 'users/SAVE_USER_REQUEST';
export const SAVE_USER_SUCCESS: string = 'users/SAVE_USER_SUCCESS';
export const SAVE_USER_FAILURE: string = 'users/SAVE_USER_FAILURE';
export const DELETE_USER_REQUEST: string = 'users/DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS: string = 'users/DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE: string = 'users/DELETE_USER_FAILURE';

export interface IGetUsersSuccessAction extends IAction {
    list: IAccountDto[];
}

export interface IGetUsersFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveUserFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteUserFailureAction extends IAction {
    errorMessage: string;
}

let users = [];
for (let i = 1; i <= 10; i++) {
    users.push({
        id: i,
        fullName: 'user_' + i,
        username: 'user_' + i,
        role: 'super user'
    });
}

export function getUsers() {
    return async(dispatch) => {
        dispatch(getUsersRequest());

        try {
            let response = await Core.postAsync<LoginDto[]>({
                url: '/api/main/users/getloginlist',
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getUsersSuccess(response.data));
            }else{
                dispatch(getUsersFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(getUsersFailure(error));
        }
    };
}

export function getUsersRequest(): IAction {
    return {
        type: GET_USERS_REQUEST
    };
}

export function getUsersSuccess(list): IGetUsersSuccessAction {
    return {
        type: GET_USERS_SUCCESS,
        list
    };
}

export function getUsersFailure(message): IGetUsersFailureAction {
    return {
        type: GET_USERS_FAILURE,
        errorMessage: message
    };
}

export function saveUser(user: IAccountDto) {
    return async(dispatch) => {
        dispatch(saveUserRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                const index = _.findIndex(users, function (u) {
                    return parseInt(u.id) === parseInt(user.id);
                });
                if (index > 0) {
                    users[index] = user;
                } else {
                    user.id = JSON.stringify(users.length + 1);
                    users.push(user);
                }
                dispatch(saveUserSuccess());
                dispatch(getUsers());
            } else {
                //let errText = await response.text();
                //dispatch(getUsersFailure('!!!Alarm!!! ' + errText));
                return '';
            }
        }
        catch (error) {
            dispatch(saveUserFailure(error));
        }
    };
}

export function saveUserRequest(): IAction {
    return {
        type: SAVE_USER_REQUEST
    };
}

export function saveUserSuccess(): IAction {
    return {
        type: SAVE_USER_SUCCESS
    };
}

export function saveUserFailure(message): ISaveUserFailureAction {
    return {
        type: SAVE_USER_FAILURE,
        errorMessage: message
    };
}

export function deleteUsers(ids: string[]) {
    return async(dispatch) => {
        dispatch(deleteUsersRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                users = users.filter((user) => {
                    return ids.indexOf(user.id) === -1;
                });
                dispatch(deleteUsersSuccess());
                dispatch(getUsers());
            } else {
                //let errText = await response.text();
                //dispatch(getUsersFailure('!!!Alarm!!! ' + errText));
                return '';
            }
        }
        catch (error) {
            dispatch(deleteUsersFailure(error));
        }
    };
}

export function deleteUsersRequest(): IAction {
    return {
        type: DELETE_USER_REQUEST
    };
}

export function deleteUsersSuccess(): IAction {
    return {
        type: DELETE_USER_SUCCESS
    };
}

export function deleteUsersFailure(message): IDeleteUserFailureAction {
    return {
        type: DELETE_USER_FAILURE,
        errorMessage: message
    };
}
