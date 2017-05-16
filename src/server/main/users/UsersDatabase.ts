import {PostgreEngine} from "../../_engine/database/postgreEngine";
import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";

export class UsersDatabase implements IUsersDatabase {
    findLoginDtoByLogin(username: string, callback: (error: any, user?: LoginDto) => void): void {

        PostgreEngine.executeQuery({
            text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
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

    findLoginDtoById(id: string, callback: (error: any, user?: LoginDto)=> void): void {

        PostgreEngine.executeQuery({
            text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
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

    getList(callback: (error: any, users: LoginDto[])=>void): void {
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
                      ON tlogins.idlogin = tusers.iduser`
        }, (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (result.rows.length === 0) {
                callback(null, null);
                return;
            }
            callback(null, result.rows);
        });
    }
}
