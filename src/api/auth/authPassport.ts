import {Strategy} from 'passport-local'
import {UserRoleEnum, AuthenticationErrorEnum, IUser, IAuthenticationError} from "./declarations";
import {Passport} from "passport";

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

class AuthPassport {
    private static FindUser(username: string, password: string, callbackFunction: (error: IAuthenticationError, user?: IUser) => void) {
        if (!username) { // NOTE: в данном случае при не переданном параметре username текст ошибки произвольный для примера, при поиске в реальном хранилище ошибки могут быть разными
            callbackFunction({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let user = constUsers.find(o => {
                return o.username === username;
            });
            if (!user) {
                callbackFunction({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            if (user.password !== password) {
                callbackFunction({
                    errorType: AuthenticationErrorEnum.WrongPassword,
                    message: "Неверный пароль. Повторите попытку."
                });
                return;
            }
            callbackFunction(null, user);
        }
    }

    // данная функция имеет в данный момент упрощенный вид
    private static FindUserById(id: string, callbackFunction: (error: IAuthenticationError, user?: IUser) => void) {
        if (!id) {
            callbackFunction({
                errorType: AuthenticationErrorEnum.SystemError,
                message: "Непредвиденная ошибка в хранилище пользователей(напр. в функцию не передан объект пользователя)"
            }, null)
        }
        else {
            let user = constUsers.find(o => {
                return o.username === id;
            });
            if (!user) {
                callbackFunction({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            callbackFunction(null, user);
        }
    }

    static InitPassport(passport: Passport): void {
        passport.use(new Strategy({
            usernameField: "username",
            passwordField: "password"
        }, (username, password, done) => {
            AuthPassport.FindUser(username, password, (err: IAuthenticationError, user: IUser) => {
                if (err) {
                    return done(err.errorType, false, {message: err.message});
                }
                else {
                    return done(null, user)
                }
            });
        }));
        passport.serializeUser<IUser,string>(function (user, done) {
            done(null, user.username);
        });
        passport.deserializeUser<IUser,string>(function (username, done) {
            AuthPassport.FindUserById(username, done);
        });
    }
}

export {AuthPassport}
