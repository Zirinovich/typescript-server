import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IAuthenticationError} from '../../shared/interfaces/authentication/IAuthenticationError';
import {AuthenticationErrorEnum} from '../../shared/interfaces/authentication/AuthenticationErrorEnum';
import {IAuthenticationMiddleware} from '../../shared/interfaces/authentication/IAuthenticationMiddleware';
import {IAccount} from '../../shared/interfaces/authentication/IAccount';

export class PassportLocalStrategyMiddlewareFunctions implements IAuthenticationMiddleware {
    login(req, res, next) {
        passportStatic.authenticate('local', (err: IAuthenticationError, account: IAccount) => {
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
            if (!account) {
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
            req.logIn(account, (error) => {
                const user = {
                    fullName: account.fullName,
                    username: account.username,
                    role: account.role
                }
                if (error) {
                    return next(error);
                }
                return res.json({account: user})
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
