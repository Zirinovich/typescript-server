import {ErrorCodeEnum} from "./ErrorCodeEnum";
export interface IAjaxResponse {
    ErrorCode: ErrorCodeEnum,
    ErrorMessage: string,
    Data: any
}