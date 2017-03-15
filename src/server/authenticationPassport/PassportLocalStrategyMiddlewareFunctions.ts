import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IAuthenticationError} from '../../shared/interfaces/authentication/IAuthenticationError';
import {IUser} from '../../shared/interfaces/authentication/IUser';
import {AuthenticationErrorEnum} from '../../shared/interfaces/authentication/AuthenticationErrorEnum';
import {IAuthenticationMiddleware} from '../../shared/interfaces/authentication/IAuthenticationMiddleware';

export class PassportLocalStrategyMiddlewareFunctions implements IAuthenticationMiddleware{
    login(req, res, next) {
        passportStatic.authenticate('local', (err: IAuthenticationError, user: IUser) => {
            if (err) {
                switch (err.errorType) {
                    case AuthenticationErrorEnum.SystemError:
                        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(err.message);
                    case AuthenticationErrorEnum.NoSuchUser:
                        return res.status(HTTP_STATUS_CODES.OK).json({errors: {username: err.message}});
                    case AuthenticationErrorEnum.WrongPassword:
                        return res.status(HTTP_STATUS_CODES.OK).json({errors: {password: err.message}});
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
                    return res.status(HTTP_STATUS_CODES.OK).json({errors});
                }
                return res.status(HTTP_STATUS_CODES.OK).json({errors: {username: err.message}});
            }
            req.logIn(user, (error) => {
                if (error) {
                    return next(error);
                }
                return res.json({account: req.user})
            });

        })(req, res, next)
    }

    logout(req, res) {
        req.logout();
        return res.json({result: 'ok'});
    }

    mustAuthenticate(req, res, next) {
        req.isAuthenticated() ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({message: "Authorization required!"});
    }
}
