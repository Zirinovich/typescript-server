import {ErrorCodeEnum} from "../classes/ErrorCodeEnum";
export interface IAjaxResponse<T> {
    errorCode: ErrorCodeEnum,
    errorMessage?: string,
    data?: T
}