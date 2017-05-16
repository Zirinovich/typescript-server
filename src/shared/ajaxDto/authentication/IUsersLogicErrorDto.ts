import {ErrorCodeEnum} from "../../classes/ErrorCodeEnum";

export interface IUsersLogicErrorDto  {
    errorCode: ErrorCodeEnum,
    message?: string
}