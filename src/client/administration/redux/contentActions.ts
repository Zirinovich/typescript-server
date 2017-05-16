import {IAction} from '../../_common/interfaces/IAction';

export const GET_CONTENT_REQUEST: string = 'content/GET_CONTENT_REQUEST';
export const GET_CONTENT_SUCCESS: string = 'content/GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAILURE: string = 'content/GET_CONTENT_FAILURE';
export const SAVE_CONTENT_REQUEST: string = 'content/SAVE_CONTENT_REQUEST';
export const SAVE_CONTENT_SUCCESS: string = 'content/SAVE_CONTENT_SUCCESS';
export const SAVE_CONTENT_FAILURE: string = 'content/SAVE_CONTENT_FAILURE';
export const DELETE_CONTENT_REQUEST: string = 'content/DELETE_CONTENT_REQUEST';
export const DELETE_CONTENT_SUCCESS: string = 'content/DELETE_CONTENT_SUCCESS';
export const DELETE_CONTENT_FAILURE: string = 'content/DELETE_CONTENT_FAILURE';

export interface IGetContentSuccessAction extends IAction {
    list: any[];
}

export interface IGetContentFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveRoleFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteRoleFailureAction extends IAction {
    errorMessage: string;
}

let content = [
    {
        id: 1,
        link: 'lol1',
        datetime: '12:01 15.05.2017',
        content: '<p>This is the initial content of the editor</p>'
    },
    {
        id: 2,
        link: 'lol2',
        datetime: '12:01 15.05.2017',
        content: '<p>This is the initial content of the editor</p>'
    },
    {
        id: 3,
        link: 'lol3',
        datetime: '12:01 15.05.2017',
        content: '<p>This is the initial content of the editor</p>'
    }
];

export function getContent() {
    return async(dispatch) => {
        dispatch(getContentRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {

                dispatch(getContentSuccess(content));
            } else {
                //let errText = await response.text();
                //dispatch(getcontentFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(getContentFailure(error));
        }
    };
}

export function getContentRequest(): IAction {
    return {
        type: GET_CONTENT_REQUEST
    };
}

export function getContentSuccess(list): IGetContentSuccessAction {
    return {
        type: GET_CONTENT_SUCCESS,
        list
    };
}

export function getContentFailure(message): IGetContentFailureAction {
    return {
        type: GET_CONTENT_FAILURE,
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
                const index = _.findIndex(content, function (u) {
                    return u.id === parseInt(role.id);
                });
                if (index > 0) {
                    content[index] = role;
                } else {
                    role.id = content.length + 1;
                    content.push(role);
                }
                dispatch(saveRoleSuccess());
                dispatch(getContent());
            } else {
                //let errText = await response.text();
                //dispatch(getcontentFailure('!!!Alarm!!! ' + errText));
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
        type: SAVE_CONTENT_REQUEST
    };
}

export function saveRoleSuccess(): IAction {
    return {
        type: SAVE_CONTENT_SUCCESS
    };
}

export function saveRoleFailure(message): ISaveRoleFailureAction {
    return {
        type: SAVE_CONTENT_FAILURE,
        errorMessage: message
    };
}

export function deleteContent(ids: number[]) {
    return async(dispatch) => {
        dispatch(deleteContentRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                content = content.filter((role) => {
                    return ids.indexOf(role.id) === -1;
                });
                dispatch(deleteContentSuccess());
                dispatch(getContent());
            } else {
                //let errText = await response.text();
                //dispatch(getcontentFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(deleteContentFailure(error));
        }
    };
}

export function deleteContentRequest(): IAction {
    return {
        type: DELETE_CONTENT_REQUEST
    };
}

export function deleteContentSuccess(): IAction {
    return {
        type: DELETE_CONTENT_SUCCESS
    };
}

export function deleteContentFailure(message): IDeleteRoleFailureAction {
    return {
        type: DELETE_CONTENT_FAILURE,
        errorMessage: message
    };
}
