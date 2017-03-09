import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IUser} from "../../interfaces/authentication/IUser";
import {IAuthenticationError} from "../../interfaces/authentication/IAuthenticationError";
import {AuthenticationErrorEnum} from "../../interfaces/authentication/AuthenticationErrorEnum";

export class PassportLocalStrategyMiddlewareFunctions {
    static login(req, res, next) {
        passportStatic.authenticate('local', (err: IAuthenticationError, user: IUser) => {
            if (err) {
                switch (err.errorType) {
                    case AuthenticationErrorEnum.SystemError:
                        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(err.message);
                    case AuthenticationErrorEnum.NoSuchUser:
                        return res.json(HTTP_STATUS_CODES.OK, {errors: {username: err.message}});
                    case AuthenticationErrorEnum.WrongPassword:
                        return res.json(HTTP_STATUS_CODES.OK, {errors: {password: err.message}});
                }
            }
            if (!user) {
                if (err === null) {
                    let errors: any = {};
                    let message = "Поле обязательно для заполнения!";
                    let body = req.body;
                    if (!body.username) {
                        errors.username = message;
                    }
                    if (!body.password) {
                        errors.password = message;
                    }
                    return res.json(HTTP_STATUS_CODES.OK, {errors: {errors}});
                }
                return res.json(HTTP_STATUS_CODES.OK, {errors: {username: err.message}});
            }
            req.logIn(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.json({account: req.user})
            });

        })(req, res, next)
    }

    static logout(req, res) {
        req.logout();
        return res.json({result: 'ok'});
    }

    static mustAuthenticate(req, res, next) {
        req.isAuthenticated() ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({message: "Authorization required!"});
    }
}
