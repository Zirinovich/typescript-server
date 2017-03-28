import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";

import {IAuthenticationError} from '../../shared/interfaces/authentication/IAuthenticationError';
import {IAccount} from '../../shared/interfaces/authentication/IAccount';
import {IUserStore} from '../../shared/interfaces/authentication/IUserStore';
import Ioc from '../../shared/classes/ioc';

export class PassportLocalStrategyTuner {
    private static store = Ioc.resolve<IUserStore>('IUserStore');

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
        passport.serializeUser<IAccount,string>(PassportLocalStrategyTuner.serializeUser);
        passport.deserializeUser<IAccount,string>(PassportLocalStrategyTuner.deserializeUser);
    }

    private static verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        PassportLocalStrategyTuner.store.FindUser(username, password, (err: IAuthenticationError, account: IAccount) => {
            if (err) {
                return done(err, false);
            }
            else {
                return done(null, account);
            }
        });
    }

    private static serializeUser(account: IAccount, done: (err, id)=> void) {
        done(null, account.id)
    }

    private static deserializeUser(id: string, done: (err, user?)=>void) {
        PassportLocalStrategyTuner.store.FindUserById(id, done);
    }
}