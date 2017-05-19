import {IAction} from '../../_common/interfaces/IAction';

export const GET_ROLES_REQUEST: string = 'roles/GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS: string = 'roles/GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE: string = 'roles/GET_ROLES_FAILURE';
export const SAVE_ROLE_REQUEST: string = 'roles/SAVE_ROLE_REQUEST';
export const SAVE_ROLE_SUCCESS: string = 'roles/SAVE_ROLE_SUCCESS';
export const SAVE_ROLE_FAILURE: string = 'roles/SAVE_ROLE_FAILURE';
export const DELETE_ROLE_REQUEST: string = 'roles/DELETE_ROLE_REQUEST';
export const DELETE_ROLE_SUCCESS: string = 'roles/DELETE_ROLE_SUCCESS';
export const DELETE_ROLE_FAILURE: string = 'roles/DELETE_ROLE_FAILURE';

export interface IGetRolesSuccessAction extends IAction {
    list: any[];
}

export interface IGetRolesFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveRoleFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteRoleFailureAction extends IAction {
    errorMessage: string;
}

let roles = [
    {
        id: 1,
        name: 'LOL 1',
        lalala: 'УоТакУот'
    },
    {
        id: 2,
        name: 'LOL 2',
        lalala: 'УоТакУот'
    },
    {
        id: 3,
        name: 'LOL 3',
        lalala: 'УоТакУот'
    }
];

export function getRoles() {
    return async(dispatch) => {
        dispatch(getRolesRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {

                dispatch(getRolesSuccess(roles));
            } else {
                //let errText = await response.text();
                //dispatch(getrolesFailure('!!!Alarm!!! ' + errText));
                return "";
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

export function saveRole(role) {
    return async(dispatch) => {
        dispatch(saveRoleRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                const index = _.findIndex(roles, function (u) {
                    return u.id === parseInt(role.id);
                });
                if (index > 0) {
                    roles[index] = role;
                } else {
                    role.id = roles.length + 1;
                    roles.push(role);
                }
                dispatch(saveRoleSuccess());
                dispatch(getRoles());
            } else {
                //let errText = await response.text();
                //dispatch(getrolesFailure('!!!Alarm!!! ' + errText));
                return "";
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
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                roles = roles.filter((role) => {
                    return ids.indexOf(role.id) === -1;
                });
                dispatch(deleteRolesSuccess());
                dispatch(getRoles());
            } else {
                //let errText = await response.text();
                //dispatch(getrolesFailure('!!!Alarm!!! ' + errText));
                return "";
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
