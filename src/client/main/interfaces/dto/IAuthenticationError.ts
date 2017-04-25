import {AuthenticationErrorEnum} from "../../../shared/dtoAjax/main/authorization/AuthenticationErrorEnum";

export interface IAuthenticationError  {
    message?: string,
    errorType: AuthenticationErrorEnum
}