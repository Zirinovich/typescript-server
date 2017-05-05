import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IAuthenticationMiddleware} from "../../../_interfaces/engine/IAuthenticationMiddleware";
import {IAuthenticationErrorDto} from "../../../../shared/ajaxDto/authentication/IAuthenticationErrorDto";
import {IAccountDto} from "../../../_interfaces/engine/dto/IAccountDto";
import {AuthenticationErrorEnum} from "../../../../shared/ajaxDto/authentication/AuthenticationErrorEnum";

export class PassportLocalStrategyMiddlewareFunctions implements IAuthenticationMiddleware {
    login(req, res, next) {
        passportStatic.authenticate('local', (err: IAuthenticationErrorDto, account: IAccountDto) => {
            if (err) {
                switch (err.errorType) {
                    case AuthenticationErrorEnum.SystemError:
                        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(err.message);
                    case AuthenticationErrorEnum.NoSuchUser:
                    case AuthenticationErrorEnum.UserAccountDisabled:
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
                };
                if (error) {
                    return next(error);
                }
                return res.json({user})
            });

        })(req, res, next)
    }

    logout(req, res) {
        if(req.isAuthenticated())
            req.logout();
        return res.json({result: 'ok'});
    }

    mustAuthenticate(req, res, next) {
        req.isAuthenticated() ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({message: "Authorization required!"});
    }
}
