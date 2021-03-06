/*
import {IVerifyOptions} from 'passport-local';
import {UserRoleEnum} from "../../../../shared/ajaxDto/authentication/UserRoleEnum";
import {IAccountDto} from "../../../_interfaces/engine/dto/IAccountDto";
import {AuthenticationErrorEnum} from "../../../../shared/ajaxDto/authentication/AuthenticationErrorEnum";
import {IUsersDatabase} from "../../../_interfaces/main/IUsersDatabase";

const constUsers: Array<any> = [{
    Id: 2,
    fullName: "Иванов Иван Иваныч",
    username: "admin",
    password: "qwe123@#",
    role: UserRoleEnum.Admin,
}, {
    Id: 1,
    fullName: "Петров Водкин Закусонович",
    username: "test",
    password: "CY9rzUYh03PK3k6DJie09g==",
    role: UserRoleEnum.User
}];

export class FakeUserStore implements IUsersDatabase {
    FindUser(username: string, password: string, callback: (error: any, user?: IAccountDto, options?: IVerifyOptions) => void): void {
        if (!username) { // NOTE: в данном случае при не переданном параметре username текст ошибки произвольный для примера, при поиске в реальном хранилище ошибки могут быть разными
            callback({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let account = constUsers.find(o => {
                return o.username === username;
            });
            if (!account) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            if (account.password !== password) {
                callback({
                    errorType: AuthenticationErrorEnum.WrongPassword,
                    message: "Неверный пароль. Повторите попытку."
                });
                return;
            }
            callback(null, {
                id: account.id,
                fullName: account.fullName,
                username: account.username,
                role: account.role
            });
        }
    }

    FindUserById(id: string, callback: (error, user?: IAccountDto)=> void): void {
        if (!id) {
            callback({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let account = constUsers.find(o => {
                return o.username === id;
            });
            if (!account) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            callback(null, {
                id: account.id,
                fullName: account.fullName,
                username: account.username,
                role: account.role
            });
        }
    }
}
    */