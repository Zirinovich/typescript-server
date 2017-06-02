export enum ErrorCodeEnum{
    NoErrors,
    UnexpectedError,
//------ Database errors
    DataBaseQueryError,
    DataBaseConnectionError,
//------ Authentication errors
    AuthInvalidCredentialsError,
    AuthNoSuchLoginError,
    AuthWrongPasswordError,
    AuthLoginDisabledError,
//------ Authorization errors
    AuthorizationRequiredError,

//------ UsersController
    UsersLoginExistsError,

//------ Common Errors
    InvalidParameterValueSymbol
}
