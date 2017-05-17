import {PostgreEngine} from "../../_engine/database/PostgreEngine";
import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";
import {PostgreEngineHelpers} from "../../_engine/database/PostgreEngineHelpers";

export class UsersDatabase implements IUsersDatabase {
    async findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>> {
        let query = `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE login = @login::text`;
        return PostgreEngineHelpers.getSingleEntity<LoginDto>(query, {login});
    }

    async findLoginDtoByIdAsync(idlogin: string): Promise<IDatabaseResult<LoginDto>> {
        let query = `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE idlogin=@idlogin`;
        return PostgreEngineHelpers.getSingleEntity<LoginDto>(query, {idlogin});
    }

    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        let query = `SELECT idlogin
                         ,login
                         ,password
                         ,status
                         ,idrole
                         ,firstname
                         ,lastname
                    FROM tlogins
                    ORDER BY login`;
        return PostgreEngineHelpers.getMultipleEntities<LoginDto>(query);
    }

    async findUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>> {
        let query = `SELECT iduser
                            ,username
                       FROM tusers
                       WHERE iduser=@iduser`;
        return PostgreEngineHelpers.getSingleEntity<UserDto>(query, {iduser});
    }

    async findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>> {
        let query = `SELECT idroe
                            ,rolename
                       FROM troles
                       WHERE idrole=@idrole`;
        return PostgreEngineHelpers.getSingleEntity<RoleDto>(query, {idrole});
    }
}
