import {AuthenticationErrorEnum} from "./AuthenticationErrorEnum";

export interface IAuthenticationErrorDto  {
    message?: string,
    errorType: AuthenticationErrorEnum
}