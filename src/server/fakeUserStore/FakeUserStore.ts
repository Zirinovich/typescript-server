import {UserRoleEnum} from "../../shared/interfaces/authentication/UserRoleEnum";
import {IUser} from "../../shared/interfaces/authentication/IUser";
import {IUserStore} from "../../shared/interfaces/authentication/IUserStore";
import {AuthenticationErrorEnum} from "../../shared/interfaces/authentication/AuthenticationErrorEnum";

const constUsers: Array<IUser> = [{
    fullName: "Иванов Иван Иваныч",
    username: "admin",
    password: "qwe123@#",
    role: UserRoleEnum.Admin,
}, {
    fullName: "Петров Водкин Закусонович",
    username: "test",
    password: "test",
    role: UserRoleEnum.User
}];

export class FakeUserStore implements IUserStore {
    FindUser(username: string, password: string, callback: Function): void {
        if (!username) { // NOTE: в данном случае при не переданном параметре username текст ошибки произвольный для примера, при поиске в реальном хранилище ошибки могут быть разными
            callback({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let user = constUsers.find(o => {
                return o.username === username;
            });
            if (!user) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            if (user.password !== password) {
                callback({
                    errorType: AuthenticationErrorEnum.WrongPassword,
                    message: "Неверный пароль. Повторите попытку."
                });
                return;
            }
            callback(null, user);
        }
    }

    FindUserById(id: string, callback: Function): void {
        if (!id) {
            callback({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let user = constUsers.find(o => {
                return o.username === id;
            });
            if (!user) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            callback(null, user);
        }
    }
}