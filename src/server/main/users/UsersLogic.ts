import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {IAccountDto} from "../../_interfaces/engine/dto/IAccountDto";
import {LoginStatusEnum} from "../../../shared/ajaxDto/authentication/LoginStatusEnum";
import {IVerifyOptions} from "passport-local";
import {IUsersLogicErrorDto} from "../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {IAuthenticationError} from "../../../shared/ajaxDto/authentication/IAuthenticationError";
import {SessionDto} from "../../_interfaces/engine/dto/SessionDto";

export class UsersLogic implements IUsersLogic {
    getList(callback: (error: UsersLogicErrorDto, users: AccountDto[])=>void) {
        usersDatabase.getList((error, dbLogins) => {
            if (error) {
                callback({
                    errorCode: ErrorCodeEnum.DataBaseSystemError,
                    message: error
                }, null);
                return;
            }
            if (!dbLogins) {
                callback(null, []);
                return;
            }
            callback(null, _.map(dbLogins, (dbLogin) => {
                return {
                    id: dbLogin.idlogin,
                    username: dbLogin.login,
                    role: dbLogin.idrole,
                    fullName: dbLogin.firstname + " " + dbLogin.lastname,
                    status: dbLogin.status
                }
            }));
        });
    }

    async checkUserAndFillSessionAsync(login: string, password: string, callback: (error: IAuthenticationError, session: SessionDto)=>void) {

        let loginResult = await usersDatabase.findLoginDtoByLoginAsync(login);
        if (loginResult.errorCode !== ErrorCodeEnum.NoErrors) {
            return callback({
                errorCode: loginResult.errorCode,
                errorMessage: loginResult.errorMessage || "InternalDatabaseError"
            }, null);
        }
        if (!loginResult.data) {
            return callback({
                errorCode: ErrorCodeEnum.AuthNoSuchLoginError,
                errorMessage: "IncorrectLogin"
            }, null);
        }
        if (loginResult.data.status === LoginStatusEnum.Disabled) {
            return callback({
                errorCode: ErrorCodeEnum.AuthLoginDisabledError,
                errorMessage: "LoginDisabled"
            }, null);
        }
        if (loginResult.data.password !== password) {
            return callback({
                errorCode: ErrorCodeEnum.AuthWrongPasswordError,
                errorMessage: "WrongPassword"
            }, null);
        }
        let userResult = await usersDatabase.findUserByIdAsync(loginResult.data.idlogin);
        let roleResult = await usersDatabase.findRoleByIdAsync(loginResult.data.idrole);
        return callback(null, {
            login: loginResult.data,
            user: userResult.errorCode === ErrorCodeEnum.NoErrors && userResult.data,
            role: roleResult.errorCode === ErrorCodeEnum.NoErrors && roleResult.data
        });
    }

    findUserByLogin(login: string, password: string, callback: (error: IUsersLogicErrorDto, user?: IAccountDto, options?: IVerifyOptions)=>void) {
        usersDatabase.findLoginDtoByLogin(login, (error, dbLogin) => {
            if (error) {
                callback({
                    errorCode: ErrorCodeEnum.DataBaseSystemError,
                    message: error
                }, null);
                return;
            }
            if (dbLogin === null) {
                callback({
                    errorCode: ErrorCodeEnum.DatabaseNoEntryError,
                    message: "Указанный пользователь не зарегистрирован."
                });
                return;
            }
            callback(null, {
                id: dbLogin.idlogin,
                username: dbLogin.login,
                role: dbLogin.idrole,
                fullName: dbLogin.firstname + " " + dbLogin.lastname,
                status: dbLogin.status

            });
        });
    }

    findUserById(id: string, callback: (error: IUsersLogicErrorDto, user?: IAccountDto)=>void) {
        usersDatabase.findUserById(id, (error, dbLogin) => {
            if (error) {
                callback({
                    errorCode: ErrorCodeEnum.DataBaseSystemError,
                    message: error
                }, null);
                return;
            }
            if (dbLogin === null) {
                callback({
                    errorCode: ErrorCodeEnum.AuthNoSuchUserError,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            callback(null, {
                id: dbLogin.idlogin,
                username: dbLogin.login,
                role: dbLogin.idrole,
                fullName: dbLogin.firstname + " " + dbLogin.lastname,
                status: dbLogin.status

            });
        });
    }
}
