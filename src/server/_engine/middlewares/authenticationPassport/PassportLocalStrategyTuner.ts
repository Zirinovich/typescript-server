import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";
import {usersLogic} from "../../../registration";
import {ISession} from "../../../_interfaces/engine/ISession";
import {IAuthenticationError} from "../../../../shared/ajaxDto/authentication/IAuthenticationError";

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
        passport.serializeUser<ISession,ISession>(PassportLocalStrategyTuner.serializeUser);
        passport.deserializeUser<ISession,ISession>(PassportLocalStrategyTuner.deserializeUser);
    }

    private static verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {

        usersLogic.checkUserAndFillSessionAsync(username, password, (error: IAuthenticationError, session: ISession) => {
            if (error) {
                return done(error, false);
            }
            else {
                return done(null, session);
            }
        });
    }

    private static serializeUser(session: ISession, done: (err, session)=> void) {
        done(null, session)
    }

    private static deserializeUser(session: ISession, done: (err, session?)=>void) {
        done(null, session);
    }
}