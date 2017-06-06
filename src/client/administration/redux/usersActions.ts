import {Fetcher} from '../../../shared/classes/Fetcher';
import {getMD5base64} from '../../../shared/tools/index';
import {LoginStatusConstants} from '../../../shared/ajaxDto/authentication/LoginStatusConstants';
import {ErrorCodeEnum} from '../../../shared/classes/ErrorCodeEnum';
import {AccountDto} from '../../../shared/ajaxDto/authentication/AccountDto';
import {IAction} from '../../_common/interfaces/IAction';
import {LoginDto} from '../../../shared/ajaxDto/authentication/LoginDto';
import {UserDto} from '../../../shared/ajaxDto/authentication/UserDto';
import {
    IGetUsersSuccessAction,
    IGetUsersFailureAction,
    IGetUserByIdSuccessAction,
    IGetUserByIdFailureAction,
    ISaveUserFailureAction,
    IDeleteUserFailureAction
} from '../interfaces/IUsers';

export const GET_USERS_REQUEST: string = 'users/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS: string = 'users/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE: string = 'users/GET_USERS_FAILURE';
export const GET_USER_BY_ID_REQUEST: string = 'users/GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS: string = 'users/GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE: string = 'users/GET_USER_BY_ID_FAILURE';
export const SAVE_USER_REQUEST: string = 'users/SAVE_USER_REQUEST';
export const SAVE_USER_SUCCESS: string = 'users/SAVE_USER_SUCCESS';
export const SAVE_USER_FAILURE: string = 'users/SAVE_USER_FAILURE';
export const DELETE_USER_REQUEST: string = 'users/DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS: string = 'users/DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE: string = 'users/DELETE_USER_FAILURE';

export function getUsers() {
    return async(dispatch) => {
        dispatch(getUsersRequest());

        try {
            let response = await Fetcher.postAsync<AccountDto[]>({
                url: '/api/main/users/getaccountlist',
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getUsersSuccess(response.data));
            } else {
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

export function getUserById(id) {
    return async(dispatch) => {
        dispatch(getUserByIdRequest());

        try {
            let response = await Fetcher.postAsync<AccountDto>({
                url: '/api/main/users/findlogin',
                data: {id}
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getUserByIdSuccess(response.data));
            } else {
                dispatch(getUserByIdFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(getUserByIdFailure(error));
        }
    };
}

export function getUserByIdRequest(): IAction {
    return {
        type: GET_USER_BY_ID_REQUEST
    };
}

export function getUserByIdSuccess(item): IGetUserByIdSuccessAction {
    return {
        type: GET_USER_BY_ID_SUCCESS,
        item
    };
}

export function getUserByIdFailure(message): IGetUserByIdFailureAction {
    return {
        type: GET_USER_BY_ID_FAILURE,
        errorMessage: message
    };
}

export function saveUser(login) {
    return async(dispatch) => {
        dispatch(saveUserRequest());

        try {
            const response = await Fetcher.postAsync<LoginDto>({
                url: '/api/main/users/addchangelogin',
                data: {
                    idlogin: -1,
                    login: login.login,
                    password: getMD5base64(login.password),
                    status: LoginStatusConstants.Enabled,
                    idrole: 2,
                }
            });
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                const responseUser = await Fetcher.postAsync<UserDto>({
                    url: '/api/main/users/addchangeuser',
                    data: {
                        iduser: response.data.idlogin,
                        username: login.username
                    }
                });
                if (responseUser.errorCode === ErrorCodeEnum.NoErrors) {
                    dispatch(saveUserSuccess());
                    dispatch(getUsers());
                } else {
                    dispatch(getUsersFailure(response.errorCode));
                }
            } else {
                dispatch(getUsersFailure(response.errorCode));
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
            const response = await Fetcher.postAsync({
                url: '/api/main/users/deletelogins',
                data: ids
            });
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(deleteUsersSuccess());
                dispatch(getUsers());
            } else {
                dispatch(getUsersFailure(response.errorCode));
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
