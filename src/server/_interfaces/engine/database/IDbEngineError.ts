import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";

export interface IDbEngineError {
    errorCode: ErrorCodeEnum,
    errorMessage: string
}