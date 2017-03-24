import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";

import {FakeUserStore} from '../fakeUserStore';
import {IUser} from '../../shared/interfaces/authentication/IUser';
import {IAuthenticationError} from '../../shared/interfaces/authentication/IAuthenticationError';
import {IAccount} from '../../shared/interfaces/authentication/IAccount';

export class PassportLocalStrategyTuner {
    private static store = new FakeUserStore();

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
        passport.serializeUser<IUser,string>(PassportLocalStrategyTuner.serializeUser);
        passport.deserializeUser<IUser,string>(PassportLocalStrategyTuner.deserializeUser);
    }

    private static verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        console.log(password);
        PassportLocalStrategyTuner.store.FindUser(username, password, (err: IAuthenticationError, account: IAccount) => {
            if (err) {
                return done(err, false);
            }
            else {
                const user = {
                    fullName: account.fullName,
                    username: account.username,
                    role: account.role
                };
                return done(null, user);
            }
        });
    }

    private static serializeUser(user: IUser, done: Function) {
        done(null, user.username)
    }

    private static deserializeUser(username: string, done: Function) {
        PassportLocalStrategyTuner.store.FindUserById(username, done);
    }
}