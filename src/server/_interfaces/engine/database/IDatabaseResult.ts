import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";

export interface IDatabaseResult<T> {
    errorCode: ErrorCodeEnum,
    errorMessage?: string,
    data?: T
}