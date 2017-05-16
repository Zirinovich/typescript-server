import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {IAccountDto} from "../../_interfaces/engine/dto/IAccountDto";
import {UserStatusEnum} from "../../../shared/ajaxDto/authentication/UserStatusEnum";
import {IVerifyOptions} from "passport-local";
import {IUsersLogicErrorDto} from "../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
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
