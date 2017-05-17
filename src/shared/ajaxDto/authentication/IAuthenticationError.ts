import {ErrorCodeEnum} from "../../classes/ErrorCodeEnum";

export interface IAuthenticationError {
    errorCode: ErrorCodeEnum,
    errorMessage: string
}