import {Core} from '../../../shared/classes/core';
import {ErrorCodeEnum} from '../../../shared/classes/ErrorCodeEnum';
import {IAction} from '../../_common/interfaces/IAction';
import {ContentDto} from '../../../shared/ajaxDto/authentication/ContentDto';

export const GET_CONTENT_REQUEST: string = 'content/GET_CONTENT_REQUEST';
export const GET_CONTENT_SUCCESS: string = 'content/GET_CONTENT_SUCCESS';
export const GET_CONTENT_FAILURE: string = 'content/GET_CONTENT_FAILURE';
export const GET_CONTENT_BY_ID_REQUEST: string = 'content/GET_CONTENT_BY_ID_REQUEST';
export const GET_CONTENT_BY_ID_SUCCESS: string = 'content/GET_CONTENT_BY_ID_SUCCESS';
export const GET_CONTENT_BY_ID_FAILURE: string = 'content/GET_CONTENT_BY_ID_FAILURE';
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

export interface IGetContentByIdSuccessAction extends IAction {
    item: ContentDto;
}

export interface IGetContentByIdFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveRoleFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteRoleFailureAction extends IAction {
    errorMessage: string;
}

export function getContent() {
    return async(dispatch) => {
        dispatch(getContentRequest());

        try {
            let response = await Core.postAsync<ContentDto[]>({
                url: '/api/main/content/getcontentlist',
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getContentSuccess(response.data));
            } else {
                dispatch(getContentFailure(response.errorCode));
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

export function getContentById(idcontent: string) {
    return async(dispatch) => {
        dispatch(getContentByIdRequest());

        try {
            const response = await Core.postAsync<ContentDto>({
                url: '/api/main/content/getcontent',
                data: {
                    idcontent: idcontent
                }
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(getContentByIdSuccess(response.data));
            } else {
                dispatch(getContentByIdFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(getContentByIdFailure(error));
        }
    };
}

export function getContentByIdRequest(): IAction {
    return {
        type: GET_CONTENT_BY_ID_REQUEST
    };
}

export function getContentByIdSuccess(item): IGetContentByIdSuccessAction {
    return {
        type: GET_CONTENT_BY_ID_SUCCESS,
        item
    };
}

export function getContentByIdFailure(message): IGetContentByIdFailureAction {
    return {
        type: GET_CONTENT_BY_ID_FAILURE,
        errorMessage: message
    };
}

export function saveContent(content: ContentDto) {
    return async(dispatch) => {
        dispatch(saveContentRequest());

        try {
            let response = await Core.postAsync<any>({
                url: '/api/main/content/addchangecontent',
                data: content
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(saveContentSuccess());
                dispatch(getContent());
            } else {
                dispatch(saveContentFailure(response.errorCode));
            }
        }
        catch (error) {
            dispatch(saveContentFailure(error));
        }
    };
}

export function saveContentRequest(): IAction {
    return {
        type: SAVE_CONTENT_REQUEST
    };
}

export function saveContentSuccess(): IAction {
    return {
        type: SAVE_CONTENT_SUCCESS
    };
}

export function saveContentFailure(message): ISaveRoleFailureAction {
    return {
        type: SAVE_CONTENT_FAILURE,
        errorMessage: message
    };
}

export function deleteContent(ids: number[]) {
    return async(dispatch) => {
        dispatch(deleteContentRequest());

        try {
            let response = await Core.postAsync<any>({
                url: '/api/main/content/deletearticle',
                data: {
                    idarticles: ids
                }
            });

            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                dispatch(deleteContentSuccess());
                dispatch(getContent());
            } else {
                dispatch(saveContentFailure(response.errorCode));
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
