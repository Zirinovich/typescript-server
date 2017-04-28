import {IAction} from '../../common/interfaces/IAction';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

export const GET_USERS_REQUEST: string = 'stars/GET_USERS_REQUEST';
export const GET_USERS_SUCCESS: string = 'stars/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE: string = 'stars/GET_USERS_FAILURE';

export interface IGetUsersSuccessAction extends IAction {
    list: IUserDto[];
}

export interface IGetUsersFailureAction extends IAction {
    errorMessage: string;
}

export function getUsers() {
    return async(dispatch) => {
        dispatch(getUsersRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                let users = [];
                for (let i = 1; i <= 100; i++) {
                    users.push({
                        id: i,
                        fullName: 'user_' + i,
                        username: 'user_' + i,
                        role: 'super user'
                    });
                }
                dispatch(getUsersSuccess(users));
            } else {
                //let errText = await response.text();
                //dispatch(getUsersFailure('!!!Alarm!!! ' + errText));
                return "";
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
