import {AuthenticationErrorEnum} from "./AuthenticationErrorEnum";

export interface IAuthenticationError  {
    message?: string,
    errorType: AuthenticationErrorEnum
}