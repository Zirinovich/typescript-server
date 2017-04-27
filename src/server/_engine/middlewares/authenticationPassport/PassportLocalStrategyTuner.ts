import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";
import {IAccountDto} from "../../../_interfaces/engine/dto/IAccountDto";
import {IAuthenticationErrorDto} from "../../../../shared/ajaxDto/authentication/IAuthenticationErrorDto";
import {usersDatabase} from "../../../registration";


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
        passport.serializeUser<IAccountDto,string>(PassportLocalStrategyTuner.serializeUser);
        passport.deserializeUser<IAccountDto,string>(PassportLocalStrategyTuner.deserializeUser);
    }

    private static verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        usersDatabase.FindUser(username, password, (err: IAuthenticationErrorDto, account: IAccountDto) => {
            if (err) {
                return done(err, false);
            }
            else {
                return done(null, account);
            }
        });
    }

    private static serializeUser(account: IAccountDto, done: (err, id)=> void) {
        done(null, account.id)
    }

    private static deserializeUser(id: string, done: (err, user?)=>void) {
        usersDatabase.FindUserById(id, done);
    }
}