import {Strategy, IVerifyOptions} from 'passport-local'
import * as passport  from "passport";
import {Express} from "express-serve-static-core";
import {IAccountDto} from "../../../_interfaces/engine/dto/IAccountDto";
import {IUsersLogicErrorDto} from "../../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {usersLogic} from "../../../registration";

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

    private static /*async*/ verifyFunction(username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) {
        // var json = JSON.stringify({
        //     login: username,
        //     password: password,
        // });
        // let response = await (await fetch(`${API_HTTP_HOST}/api/main/users/finduserbyloginpassword`, {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: json
        // })).json();

        usersLogic.findUserByLoginPassword(username, password, (err: IUsersLogicErrorDto, account: IAccountDto) => {
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
        usersLogic.findUserById(id, done);
    }
}