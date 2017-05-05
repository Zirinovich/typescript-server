import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {IAccountDto} from "../../_interfaces/engine/dto/IAccountDto";
import {AuthenticationErrorEnum} from "../../../shared/ajaxDto/authentication/AuthenticationErrorEnum";
import {UserStatusEnum} from "../../../shared/ajaxDto/authentication/UserStatusEnum";
import {IVerifyOptions} from "passport-local";
export class UsersLogic implements IUsersLogic {

    public i: number = 0;

    login(userName, password) {
        //authenticationMiddleware.login
    }

    logout() {
        //authenticationMiddleware.logout
    }

    test(j: number) {
        console.log(`i=${this.i}   j=${j}`);
        setTimeout(() => {
            this.i++;
        }, 2000);
    }

    getList() {
        return usersDatabase.getList();
    }

    findUserByLogin(login: string, password: string, callback: (error: any, user?: IAccountDto, options?: IVerifyOptions)=>{}) {
        usersDatabase.findUserByLogin(login, (error, dbLogin) => {
            if (error) {
                callback({
                    errorType: AuthenticationErrorEnum.SystemError,
                    message: error
                }, null);
                return;
            }
            if (dbLogin === null) {
                callback({
                    errorType: AuthenticationErrorEnum.NoSuchUser,
                    message: "Данный пользователь не зарегистрирован."
                });
                return;
            }
            if (dbLogin.status === UserStatusEnum.Disabled) {
                callback({
                    errorType: AuthenticationErrorEnum.UserAccountDisabled,
                    message: "Аккаунт данного пользователя отключен."
                });
                return;
            }
            if (dbLogin.password !== password) {
                callback({
                    errorType: AuthenticationErrorEnum.WrongPassword,
                    message: "Неверный пароль."
                });
                return;
            }
            callback(null, {
                id: dbLogin.idlogin,
                username: dbLogin.login,
                role: dbLogin.idrole,
                fullName: dbLogin.firstname + " " + dbLogin.lastname,
                status: dbLogin.status

            });
        });
    }

    findUserById(){

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
