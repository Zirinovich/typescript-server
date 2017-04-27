import {IUserStore} from "../../shared/ajaxDto/authentication/IUserStore";
import {AuthenticationErrorEnum} from '../../shared/ajaxDto/authentication/AuthenticationErrorEnum';
import {PostgreEngine} from '../_engine/database/PostgreEngine';
import {IVerifyOptions} from 'passport-local';
import {IAccount} from '../../shared/ajaxDto/authentication/IAccount';

export class UserStore implements IUserStore {
    FindUser(username: string, password: string, callback: (error: any, user?: IAccount, options?: IVerifyOptions) => void): void {

        PostgreEngine.executeQuery({
            text: `SELECT
                        user_accounts_id as id,
                        username,
                        password,
                        full_name as fullName,
                        role
                    FROM t_user_accounts WHERE username=$1::text`,
            values: [username]
        }, (err, result) => {
            if (err) {
                callback({
                    errorType: AuthenticationErrorEnum.SystemError,
                    message: err
                }, null);
                return;
            }
            if (result.rows.length === 0) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            const account = result.rows[0];
            if (account.password !== password) {
                callback({
                    errorType: AuthenticationErrorEnum.WrongPassword,
                    message: "Неверный пароль. Повторите попытку."
                });
                return;
            }
            callback(null, {
                id: account.id,
                fullName: account.fullname, // похоже что драйверу наплевать в каком регистре составлен запрос, возвращаемые поля идут в нижнем регистре
                username: account.username,
                role: account.role
            });
        });
    }

    FindUserById(id: string, callback: (error, user?: IAccount)=> void): void {

        PostgreEngine.executeQuery({
            text: `SELECT user_accounts_id as id,
                        username,
                        password,
                        full_name as fullName,
                        role
                    FROM t_user_accounts WHERE user_accounts_id=$1`,
            values: [id]
        }, (err, result) => {
            if (err) {
                callback({
                    errorType: AuthenticationErrorEnum.SystemError,
                    message: err
                }, null);
                return;
            }
            if (result.rows.length === 0) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            const account = result.rows[0];
            callback(null, {
                id: account.id,
                fullName: account.fullname,
                username: account.username,
                role: account.role
            });
        });
    }
}
