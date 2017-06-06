import {Fetcher} from '../../../shared/classes/Fetcher';
import {ErrorCodeEnum} from '../../../shared/classes/ErrorCodeEnum';
import {RoleDto} from '../../../shared/ajaxDto/authentication/RoleDto';
import {IAction} from '../../_common/interfaces/IAction';
import {
    IGetRolesSuccessAction,
    IGetRolesFailureAction,
    IGetRoleByIdSuccessAction,
    IGetRoleByIdFailureAction,
    ISaveRoleFailureAction,
    IDeleteRoleFailureAction
} from '../interfaces/IRoles';

export const GET_ROLES_REQUEST: string = 'roles/GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS: string = 'roles/GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE: string = 'roles/GET_ROLES_FAILURE';
export const GET_ROLE_BY_ID_REQUEST: string = 'roles/GET_ROLE_BY_ID_REQUEST';
export const GET_ROLE_BY_ID_SUCCESS: string = 'roles/GET_ROLE_BY_ID_SUCCESS';
export const GET_ROLE_BY_ID_FAILURE: string = 'roles/GET_ROLE_BY_ID_FAILURE';
export const SAVE_ROLE_REQUEST: string = 'roles/SAVE_ROLE_REQUEST';
export const SAVE_ROLE_SUCCESS: string = 'roles/SAVE_ROLE_SUCCESS';
export const SAVE_ROLE_FAILURE: string = 'roles/SAVE_ROLE_FAILURE';
export const DELETE_ROLE_REQUEST: string = 'roles/DELETE_ROLE_REQUEST';
export const DELETE_ROLE_SUCCESS: string = 'roles/DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILURE: string = 'roles/DELETE_ROLE_FAILURE';

export function getRoles() {
    return async(dispatch) => {
        dispatch(getRolesRequest());

        try {
            const response = await Fetcher.postAsync<RoleDto>({
                url: '/api/main/users/getrolelist'
            });
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getRolesSuccess(response.data));
            } else {
                dispatch(getRolesFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(getRolesFailure(error));
        }
    };
}

export function getRolesRequest(): IAction {
    return {
        type: GET_ROLES_REQUEST
    };
}

export function getRolesSuccess(list): IGetRolesSuccessAction {
    return {
        type: GET_ROLES_SUCCESS,
        list
    };
}

export function getRolesFailure(message): IGetRolesFailureAction {
    return {
        type: GET_ROLES_FAILURE,
        errorMessage: message
    };
}

export function getRoleById(idrole) {
    return async(dispatch) => {
        dispatch(getRoleByIdRequest());
        if (idrole) {
            try {
                const response = await Fetcher.postAsync<RoleDto>({
                    url: '/api/main/users/findrole',
                    data: {idrole}
                });
                if (response.errorCode === ErrorCodeEnum.NoErrors) {
                    dispatch(getRoleByIdSuccess(response.data));
                } else {
                    dispatch(getRoleByIdFailure(response.errorCode));
                }
            }
            catch (error) {
                dispatch(getRoleByIdFailure(error));
            }
        } else {
            dispatch(getRoleByIdSuccess(null));
        }
    };
}

export function getRoleByIdRequest(): IAction {
    return {
        type: GET_ROLE_BY_ID_REQUEST
    };
}

export function getRoleByIdSuccess(item): IGetRoleByIdSuccessAction {
    return {
        type: GET_ROLE_BY_ID_SUCCESS,
        item
    };
}

export function getRoleByIdFailure(message): IGetRoleByIdFailureAction {
    return {
        type: GET_ROLE_BY_ID_FAILURE,
        errorMessage: message
    };
}

export function saveRole(role: RoleDto) {
    return async(dispatch) => {
        dispatch(saveRoleRequest());

        try {
            const response = await Fetcher.postAsync<RoleDto>({
                url: '/api/main/users/addchangerole',
                data: {role}
            });
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(saveRoleSuccess());
                dispatch(getRoles());
            } else {
                dispatch(saveRoleFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(saveRoleFailure(error));
        }
    };
}

export function saveRoleRequest(): IAction {
    return {
        type: SAVE_ROLE_REQUEST
    };
}

export function saveRoleSuccess(): IAction {
    return {
        type: SAVE_ROLE_SUCCESS
    };
}

export function saveRoleFailure(message): ISaveRoleFailureAction {
    return {
        type: SAVE_ROLE_FAILURE,
        errorMessage: message
    };
}

export function deleteRoles(ids: number[]) {
    return async(dispatch) => {
        dispatch(deleteRolesRequest());

        try {
            const response = await Fetcher.postAsync<RoleDto>({
                url: '/api/main/users/deleteroles',
                data: ids
            });
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(deleteRolesSuccess());
                dispatch(getRoles());
            } else {
                dispatch(deleteRolesFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(deleteRolesFailure(error));
        }
    };
}

export function deleteRolesRequest(): IAction {
    return {
        type: DELETE_ROLE_REQUEST
    };
}

export function deleteRolesSuccess(): IAction {
    return {
        type: DELETE_ROLE_SUCCESS
    };
}

export function deleteRolesFailure(message): IDeleteRoleFailureAction {
    return {
        type: DELETE_ROLE_FAILURE,
        errorMessage: message
    };
}
