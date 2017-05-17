import {PostgreEngine} from "../../_engine/database/postgreEngine";
import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";

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
                data: res.data.length > 0 && res.data[0]
            });
        });
    }

    async findLoginDtoByIdAsync(idlogin: string): Promise<IDatabaseResult<LoginDto>> {

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
                    WHERE idlogin=@idlogin`,
                values: {idlogin}
            });
            resolve({
                errorCode: res.errorCode,
                errorMessage: res.errorMessage,
                data: res.data.length > 0 && res.data[0]
            });
        });
    }

    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        return new Promise<IDatabaseResult<LoginDto[]>>(async resolve => {
            let result = await PostgreEngine.executeQueryAsync<LoginDto>({
                text: `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,firstname
                         ,lastname
                    FROM tlogins
                    ORDER BY login`
            });
            resolve({
                errorCode: result.errorCode,
                errorMessage: result.errorMessage,
                data: result.data.length > 0 && result.data
            });
        });
    }

    getUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>> {
        return new Promise<IDatabaseResult<UserDto>>(async resolve => {
            let result = await PostgreEngine.executeQueryAsync<UserDto>({
                text: `SELECT iduser
                            ,username
                       FROM tusers
                       WHERE iduser=@iduser`,
                values: {iduser}
            });
            resolve({
                errorCode: result.errorCode,
                errorMessage: result.errorMessage,
                data: result.data.length > 0 && result.data[0]
            });
        })
    }

    getRoleByIdAsync(idrole: number): Promise<IDatabaseResult<UserDto>> {
        return new Promise<IDatabaseResult<UserDto>>(async resolve => {
            let result = await PostgreEngine.executeQueryAsync<UserDto>({
                text: `SELECT idroe
                            ,rolename
                       FROM troles
                       WHERE idrole=@idrole`,
                values: {idrole}
            });
            resolve({
                errorCode: result.errorCode,
                errorMessage: result.errorMessage,
                data: result.data.length > 0 && result.data[0]
            });
        })
    }

    get
}
