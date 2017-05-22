import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";
import {dbEngine} from "../../registration";

export class UsersDatabase implements IUsersDatabase {
    // TODO: Может во всех методах где возвращается LoginDto вместо пароля возвращать пустую строку или null
    // для всех методов кроме findLoginDtoByLoginAsyn или сделать это в UsersLogic
    async findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE login = @login`;
        return dbEngine.querySingleAsync<LoginDto>({text: query, values: {login}});
    }

    async findLoginDtoByCredentialsAsync(login: string, password: string): Promise<IDatabaseResult<LoginDto>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE login = @login AND password = @password`;
        return dbEngine.querySingleAsync<LoginDto>({text: query, values: {login, password}});
    }

    async findLoginDtoByIdAsync(idlogin: number): Promise<IDatabaseResult<LoginDto>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    WHERE idlogin=@idlogin`;
        return dbEngine.querySingleAsync<LoginDto>({text: query, values: {idlogin}});
    }

    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,idrole
                         ,firstname
                         ,lastname
                    FROM tlogins
                    ORDER BY login`;
        return dbEngine.queryAsync<LoginDto>({text: query});
    }

    async findUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>> {
        let query = `SELECT iduser
                            ,username
                       FROM tusers
                       WHERE iduser=@iduser`;
        return dbEngine.querySingleAsync<UserDto>({text: query, values: {iduser}});
    }

    async findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>> {
        let query = `SELECT idrole
                            ,rolename
                       FROM troles
                       WHERE idrole=@idrole`;
        return dbEngine.querySingleAsync<RoleDto>({text: query, values: {idrole}});
    }
}
