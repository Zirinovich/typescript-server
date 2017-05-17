import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";
import {IQueryResult} from "./IQueryResult";

export interface IDatabaseResult<T> {
    errorCode: ErrorCodeEnum,
    errorMessage?: string,
    data?: T
}