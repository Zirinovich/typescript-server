import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";
import {usersLogic} from "../../../registration";
import {SessionDto} from "../../../_interfaces/engine/dto/SessionDto";
import {ErrorCodeEnum} from "../../../../shared/classes/ErrorCodeEnum";
import {IDatabaseResult} from "../../../_interfaces/engine/database/IDatabaseResult";

export class PassportLocalStrategyTuner {
    static Setup(app: Express) {
        PassportLocalStrategyTuner.InitializePassport();
        app.use(passport.initialize());
        app.use(passport.session());
    }

    private static InitializePassport() {
        passport.use(new Strategy({
                usernameField: "username",
                passwordField: "password"
            }, PassportLocalStrategyTuner.verifyFunction
        ));
        passport.serializeUser<SessionDto,SessionDto>(PassportLocalStrategyTuner.serializeUser);
        passport.deserializeUser<SessionDto,SessionDto>(PassportLocalStrategyTuner.deserializeUser);
    }

    private static verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        usersLogic.checkLoginAndFillSessionAsync(username, password, (response: IDatabaseResult<SessionDto>) => {
            if (response.errorCode === ErrorCodeEnum.NoErrors) {
                return done(null, response);
            }
            else {
                return done(response, false);
            }
        });
    }

    private static serializeUser(session: SessionDto, done: (err, session)=> void) {
        done(null, session)
    }

    private static deserializeUser(session: SessionDto, done: (err, session?)=>void) {
        done(null, session);
    }
}