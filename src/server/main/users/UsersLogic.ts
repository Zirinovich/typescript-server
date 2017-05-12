import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {IAccountDto} from "../../_interfaces/engine/dto/IAccountDto";
import {UsersDatabaseErrorEnum} from "../../../shared/ajaxDto/authentication/UsersDatabaseErrorEnum";
import {UserStatusEnum} from "../../../shared/ajaxDto/authentication/UserStatusEnum";
import {IVerifyOptions} from "passport-local";
import {IUsersLogicErrorDto} from "../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
export class UsersLogic implements IUsersLogic {

    public i: number = 0;

    login(userName, password) {
        //authenticationMiddleware.login
    }

    logout() {
        //authenticationMiddleware.logout
    }

    test(j: number) {
        console.log(`i=${this.i}   j=${j}`);
        setTimeout(() => {
            this.i++;
        }, 2000);
    }

    getList(callback: (error: IUsersLogicErrorDto, users: IAccountDto[])=>void) {
        usersDatabase.getList((error, dbLogins) => {
            if (error) {
                callback({
                    errorType: UsersDatabaseErrorEnum.SystemError,
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

    findUserByLoginPassword(login: string, password: string, callback: (error: IUsersLogicErrorDto, user?: IAccountDto, options?: IVerifyOptions)=>void) {
        usersDatabase.findUserByLogin(login, (error, dbLogin) => {
            if (error) {
                callback({
                    errorType: UsersDatabaseErrorEnum.SystemError,
                    message: error
                }, null);
                return;
            }
            if (dbLogin === null) {
                callback({
                    errorType: UsersDatabaseErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            if (dbLogin.password !== password) {
                callback({
                    errorType: UsersDatabaseErrorEnum.WrongPassword,
                    message: "Неверный пароль."
                });
                return;
            }
            if (dbLogin.status === UserStatusEnum.Disabled) {
                callback({
                    errorType: UsersDatabaseErrorEnum.UserAccountDisabled,
                    message: "Аккаунт данного пользователя отключен."
                }, {
                    id: dbLogin.idlogin,
                    username: dbLogin.login,
                    role: dbLogin.idrole,
                    fullName: dbLogin.firstname + " " + dbLogin.lastname,
                    status: dbLogin.status

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
                    errorType: UsersDatabaseErrorEnum.SystemError,
                    message: error
                }, null);
                return;
            }
            if (dbLogin === null) {
                callback({
                    errorType: UsersDatabaseErrorEnum.NoSuchUser,
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
