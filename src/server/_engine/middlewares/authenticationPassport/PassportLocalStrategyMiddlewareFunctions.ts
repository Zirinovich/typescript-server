import * as passportStatic  from "passport";
import HTTP_STATUS_CODES from 'http-status-enum';
import {IAuthenticationMiddleware} from "../../../_interfaces/engine/IAuthenticationMiddleware";
import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";
import {SessionDto} from "../../../../shared/ajaxDto/authentication/SessionDto";
import {IAjaxResponse} from "../../../../shared/ajaxDto/IAjaxResponse";

export class PassportLocalStrategyMiddlewareFunctions implements IAuthenticationMiddleware {
    login(req, res, next) {
        passportStatic.authenticate('local', (err: IAjaxResponse<SessionDto>, sessionResponse: IAjaxResponse<SessionDto>) => {
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

            let session = _.cloneDeep(sessionResponse.data);
            sessionResponse.data.login.password = undefined; // NOTE: Это необходимо для того, что б пароль не попал на клиентскую сторону, хотя возможно лучше перенести сразу в UsersLogic после проверки пароля.

            req.logIn(session, (error) => {
                if (error) {
                    return next(error);
                }
                return res.json(sessionResponse)
            });

        })(req, res, next)
    }

    logout(req, res) {
        if (req.isAuthenticated())
            req.logout();
        return res.json({errorCode: ErrorCodeEnum.NoErrors});
    }

    mustAuthenticate(req, res, next) {
        req.isAuthenticated() ? next() : res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({errorCode: ErrorCodeEnum.AuthorizationRequiredError});
    }
}
