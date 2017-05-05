import {PostgreEngine} from "../../_engine/database/postgreEngine";
import {IVerifyOptions} from "passport-local";
import {IAccountDto} from "../../_interfaces/engine/dto/IAccountDto";
import {AuthenticationErrorEnum} from "../../../shared/ajaxDto/authentication/AuthenticationErrorEnum";
import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {UserStatusEnum} from "../../../shared/ajaxDto/authentication/UserStatusEnum";
import {ILoginDto} from "../../../shared/ajaxDto/authentication/ILoginDto";

export class UsersDatabase implements IUsersDatabase {
    findUserByLogin(username: string, callback: (error: any, user?: ILoginDto) => void): void {

        PostgreEngine.executeQuery({
            text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,firstname
                         ,lastname
                    FROM tlogins
                    JOIN tusers
                      ON tlogins.idlogin = tusers.iduser
                    WHERE login = $1::text`,
            values: [username]
        }, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (result.rows.length === 0) {
                callback(null, null);
                return;
            }
            callback(null, result.rows[0]);
        });
    }

    findUserById(id: string, callback: (error, user?: ILoginDto)=> void): void {

        PostgreEngine.executeQuery({
            text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,firstname
                         ,lastname
                    FROM tlogins
                    JOIN tusers
                      ON tlogins.idlogin = tusers.iduser
                    WHERE idlogin=$1`,
            values: [id]
        }, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (result.rows.length === 0) {
                callback(null, null);
                return;
            }
            callback(null, result.rows[0]);
        });
    }

    getList() {

    }
}
