import {PostgreEngine} from "../../_engine/database/postgreEngine";
import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";

export class UsersDatabase implements IUsersDatabase {
    async findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>> {

        return new Promise<IDatabaseResult<LoginDto>>(async resolve => {
            let res = await PostgreEngine.executeQueryAsync<LoginDto>({
                text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE login = @login::text`,
                values: {login}
            });
            resolve({
                errorCode: res.errorCode,
                errorMessage: res.errorMessage,
                data: res.data.length>0 && res.data[0]
            })
        });
        /*
         if (result.data.length === 0) {
         resolve({

         errorMessage: '(0 rows affected)'
         })
         )
         }
         else {
         return new Promise<IDatabaseResult<LoginDto>>(resolve =>
         resolve({
         errorCode: ErrorCodeEnum.NoErrors,
         data: result[0]
         })
         )
         }
         */
    }

    async findLoginDtoByIdAsync(idlogin: string): Promise<IDatabaseResult<LoginDto>> {

        try {
            let result = PostgreEngine.executeQueryAsync<LoginDto>({
                text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE idlogin=@idlogin`,
                values: {idlogin}
            });
        }
        catch (e) {

        }

        return
    }

    // getListAsync(callback: (error: any, users: LoginDto[])=>void): void {
    getListAsync(): Promise<IDatabaseResult<LoginDto>> {
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
