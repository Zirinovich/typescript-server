import {IAction} from '../../_common/interfaces/IAction';

export const GET_FILES_REQUEST: string = 'files/GET_FILES_REQUEST';
export const GET_FILES_SUCCESS: string = 'files/GET_FILES_SUCCESS';
export const GET_FILES_FAILURE: string = 'files/GET_FILES_FAILURE';
export const SAVE_FILE_REQUEST: string = 'files/SAVE_FILE_REQUEST';
export const SAVE_FILE_SUCCESS: string = 'files/SAVE_FILE_SUCCESS';
export const SAVE_FILE_FAILURE: string = 'files/SAVE_FILE_FAILURE';
export const DELETE_FILE_REQUEST: string = 'files/DELETE_FILE_REQUEST';
export const DELETE_FILE_SUCCESS: string = 'files/DELETE_FILE_SUCCESS';
export const DELETE_FILE_FAILURE: string = 'files/DELETE_FILE_FAILURE';

export interface IGetFilesSuccessAction extends IAction {
    list: any[];
}

export interface IGetFilesFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveFileFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteFileFailureAction extends IAction {
    errorMessage: string;
}

let files = [
    {
        id: 1,
        name: 'test',
        link: 'test'
    }
];

export function getFiles() {
    return async(dispatch) => {
        dispatch(getFilesRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {

                dispatch(getFilesSuccess(files));
            } else {
                //let errText = await response.text();
                //dispatch(getfilesFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(getFilesFailure(error));
        }
    };
}

export function getFilesRequest(): IAction {
    return {
        type: GET_FILES_REQUEST
    };
}

export function getFilesSuccess(list): IGetFilesSuccessAction {
    return {
        type: GET_FILES_SUCCESS,
        list
    };
}

export function getFilesFailure(message): IGetFilesFailureAction {
    return {
        type: GET_FILES_FAILURE,
        errorMessage: message
    };
}

export function saveFile(file) {
    return async(dispatch) => {
        dispatch(saveFileRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                const index = _.findIndex(files, function (u) {
                    return u.id === parseInt(file.id);
                });
                if (index > 0) {
                    files[index] = file;
                } else {
                    file.id = files.length + 1;
                    files.push(file);
                }
                dispatch(saveFileSuccess());
                dispatch(getFiles());
            } else {
                //let errText = await response.text();
                //dispatch(getfilesFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(saveFileFailure(error));
        }
    };
}

export function saveFileRequest(): IAction {
    return {
        type: SAVE_FILE_REQUEST
    };
}

export function saveFileSuccess(): IAction {
    return {
        type: SAVE_FILE_SUCCESS
    };
}

export function saveFileFailure(message): ISaveFileFailureAction {
    return {
        type: SAVE_FILE_FAILURE,
        errorMessage: message
    };
}

export function deleteFiles(ids: number[]) {
    return async(dispatch) => {
        dispatch(deleteFilesRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {
                files = files.filter((file) => {
                    return ids.indexOf(file.id) === -1;
                });
                dispatch(deleteFilesSuccess());
                dispatch(getFiles());
            } else {
                //let errText = await response.text();
                //dispatch(getfilesFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(deleteFilesFailure(error));
        }
    };
}

export function deleteFilesRequest(): IAction {
    return {
        type: DELETE_FILE_REQUEST
    };
}

export function deleteFilesSuccess(): IAction {
    return {
        type: DELETE_FILE_SUCCESS
    };
}

export function deleteFilesFailure(message): IDeleteFileFailureAction {
    return {
        type: DELETE_FILE_FAILURE,
        errorMessage: message
    };
}
