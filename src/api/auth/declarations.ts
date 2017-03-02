enum AuthenticationErrorEnum{
    SystemError = 1,
    NoSuchUser = 2,
    WrongPassword = 3
}

enum UserRoleEnum{
    Admin = 1,
    User = 2
}

interface IAuthenticationError {
    message?: string,
    errorType: AuthenticationErrorEnum
}

interface IUser {
    fullName: string,
    username: string,
    password: string,
    role: UserRoleEnum
}

export {UserRoleEnum, AuthenticationErrorEnum, IAuthenticationError, IUser}