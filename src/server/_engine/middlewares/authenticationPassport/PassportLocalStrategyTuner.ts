import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";
import {IAccountDto} from "../../../_interfaces/engine/dto/IAccountDto";
import {IUsersLogicErrorDto} from "../../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {usersLogic} from "../../../registration";
import {ISession} from "../../../../shared/classes/ISession";

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

    private static async verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        var json = JSON.stringify({
            login: username,
            password: password,
        });

        usersLogic.findUserByLogin(username, password, (err: IUsersLogicErrorDto, account: ISession) => {
            if (err) {
                return done(err, false);
            }
            else {
                return done(null, account);
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