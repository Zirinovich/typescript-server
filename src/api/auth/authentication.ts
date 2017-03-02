import {AuthPassport} from './authPassport'
import * as passport from 'passport'
import {IUser, AuthenticationErrorEnum} from "./declarations";
import {IVerifyOptions} from "passport-local";
import HTTP_STATUS_CODES from 'http-status-enum';

const Init = AuthPassport.InitPassport;

export {Init};

export function loginAPI(req, res, next) {
    passport.authenticate('local', (err: AuthenticationErrorEnum, user: IUser, info: IVerifyOptions) => {
        if (err) {
            switch (err) {
                case AuthenticationErrorEnum.SystemError:
                    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(info.message);
                case AuthenticationErrorEnum.NoSuchUser:
                    return res.json(HTTP_STATUS_CODES.OK, {errors: {username: info.message}});
                case AuthenticationErrorEnum.WrongPassword:
                    return res.json(HTTP_STATUS_CODES.OK, {errors: {password: info.message}});
            }
        }
        if (!user) {
            throw new Error("Unexpected error. 'user' is null");
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({account: req.user})
        });

    })(req, res, next)
}

export function logoutAPI(req, res) {
    req.logout();
    return res.json({result: 'ok'});
}
