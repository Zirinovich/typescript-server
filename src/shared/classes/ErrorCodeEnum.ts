export enum ErrorCodeEnum{
    NoErrors,
//------ Database errors
    DataBaseQueryError,
    DataBaseConnectionError,
//------ Authentication errors
    AuthNoSuchLoginError,
    AuthWrongPasswordError,
    AuthLoginDisabledError,
//------ Authorization errors
    AuthorizationRequiredError
}
