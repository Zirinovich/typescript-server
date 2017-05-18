import {ErrorCodeEnum} from "./ErrorCodeEnum";
export interface IAjaxResponse<T> {
    errorCode: ErrorCodeEnum,
    errorMessage?: string,
    data?: T
}