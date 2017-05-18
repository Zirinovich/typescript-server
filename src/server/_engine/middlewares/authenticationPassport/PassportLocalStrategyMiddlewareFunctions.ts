import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IAuthenticationMiddleware} from "../../../_interfaces/engine/IAuthenticationMiddleware";
import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";
import {IAuthenticationError} from "../../../../shared/ajaxDto/authentication/IAuthenticationError";
import {SessionDto} from "../../../_interfaces/engine/dto/SessionDto";

export class PassportLocalStrategyMiddlewareFunctions implements IAuthenticationMiddleware {
    login(req, res, next) {
        passportStatic.authenticate('local', (err: IAuthenticationError, session: SessionDto) => {
            if (err) {
                switch (err.errorCode) {
                    case ErrorCodeEnum.DataBaseConnectionError:
                    case ErrorCodeEnum.DataBaseQueryError:
                        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(err.errorMessage);
                    case ErrorCodeEnum.AuthNoSuchLoginError:
                    case ErrorCodeEnum.AuthLoginDisabledError:
                        return res.status(HTTP_STATUS_CODES.OK).json({errors: {username: err.errorMessage}});
                    case ErrorCodeEnum.AuthWrongPasswordError:
                        return res.status(HTTP_STATUS_CODES.OK).json({errors: {password: err.errorMessage}});
                }
            }

            let responseSession = Object.assign({}, {...session}, {password: undefined});
            req.logIn(session, (error) => {
                if (error) {
                    return next(error);
                }
                return res.json(responseSession)
            });

        })(req, res, next)
    }

    logout(req, res) {
        if (req.isAuthenticated())
            req.logout();
        return res.json({result: 'ok'});
    }

    mustAuthenticate(req, res, next) {
        req.isAuthenticated() ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({message: "Authorization required!"});
    }
}
