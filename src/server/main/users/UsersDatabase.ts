import {IUsersDatabase} from "../../_interfaces/main/IUsersDatabase";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";
import {dbEngine} from "../../registration";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";

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

    async insertLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>> {
        let query = `INSERT INTO tlogins (login, password, status, idrole, logincreated)
                     VALUES (@login
                       ,@password
                       ,@status
                       ,@idrole
                       ,now() AT TIME ZONE 'utc')
                     ON CONFLICT (login)
                       DO NOTHING
                     RETURNING *`;
        return dbEngine.querySingleAsync<LoginDto>({text: query, values: login});
    };

    async updateLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>> {
        let query = `UPDATE tlogins
                     SET password = @password
                        ,status = @status
                        ,idrole = @idrole
                        ,loginupdated = now() AT TIME ZONE 'utc'
                     WHERE idlogin = @idlogin AND login = @login
                     RETURNING *`;
        return dbEngine.querySingleAsync<LoginDto>({text: query, values: login});
    };

    async deleteLoginAsync(id: number): Promise<IDatabaseResult<{idlogin: number}>> {
        let query = `DELETE FROM tlogins WHERE idlogin=@idlogin RETURNING idlogin`;
        return dbEngine.querySingleAsync<{idlogin: number}>({text: query, values: {idlogin: id}});
    };

    async deleteLoginsAsync(ids: number[]): Promise<IDatabaseResult<{idlogin: number}[]>> {
        let query = `DELETE FROM tlogins WHERE idlogin IN (@idlogins) RETURNING idlogin`;
        return dbEngine.queryAsync<{idlogin: number}>({text: query, values: {idlogins: ids}});
    };

    async insertUserAsync(user: UserDto): Promise<IDatabaseResult<UserDto>> {
        let query = `INSERT INTO tusers (iduser, username)
                     VALUES (@iduser
                       ,@username)
                     RETURNING *`;
        return dbEngine.querySingleAsync<UserDto>({text: query, values: user});
    };

    async updateUserAsync(user: UserDto): Promise<IDatabaseResult<UserDto>> {
        let query = `UPDATE tusers
                     SET username = @username
                     WHERE iduser = @iduser
                     RETURNING *`;
        return dbEngine.querySingleAsync<UserDto>({text: query, values: user});
    };

    async addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>> {
        let query = `WITH new_values (idlogin, login, password, status, idrole, loginupdated) AS (
                      VALUES (@idlogin, @login, @password, @status, @idrole, now() AT TIME ZONE 'utc')
                    ),
                        upsert AS (
                        UPDATE tlogins t
                        SET password     = nv.password
                          , status       = nv.status
                          , idrole       = nv.idrole
                          , loginupdated = nv.loginupdated
                        FROM new_values nv
                        WHERE t.idlogin = nv.idlogin AND t.login = nv.login
                        RETURNING t.idlogin, t.login, t.password, t.status, t.idrole, t.logincreated, t.loginupdated
                      )
                    
                    INSERT INTO tlogins (login, password, status, idrole, logincreated)
                      SELECT
                        login,
                        password,
                        status,
                        idrole,
                        loginupdated
                      FROM new_values
                      WHERE NOT EXISTS(SELECT 1
                                       FROM upsert up
                                       WHERE up.idlogin = new_values.idlogin
                      )
                    RETURNING *;`;

        return dbEngine.querySingleAsync<LoginDto>({text: query, values: login});
    }

    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,idrole
                         ,logincreated
                         ,loginupdated
                    FROM tlogins
                    ORDER BY login`;
        return dbEngine.queryAsync<LoginDto>({text: query});
    }

    async getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>> {
        let query = `SELECT idlogin
                         ,login
                         ,'buS2t+Dy3JwvJmdv/vif7A==' AS password
                         ,status
                         ,tlogins.idrole
                         ,logincreated
                         ,loginupdated
						 ,rolename
						 ,iduser
						 ,username
                    FROM tlogins
                    LEFT JOIN tusers ON tlogins.idlogin = tusers.iduser
					LEFT JOIN troles ON tlogins.idrole = troles.idrole
                    ORDER BY login`;
        return new Promise<IDatabaseResult<AccountDto[]>>(async(resolve) => {
            let accounts = await dbEngine.queryAsync({text: query});
            if (accounts.errorCode !== ErrorCodeEnum.NoErrors) {
                resolve(<IDatabaseResult<AccountDto[]>>accounts);
            }
            else {
                resolve({
                    errorCode: accounts.errorCode,
                    errorMessage: accounts.errorMessage,
                    data: _.map(accounts.data, (obj: any) => {
                        return {
                            login: {
                                idlogin: obj.idlogin,
                                login: obj.login,
                                password: obj.password,
                                status: obj.status,
                                idrole: obj.idrole,
                                logincreated: obj.logincreated,
                                loginupdated: obj.loginupdated
                            },
                            user: {
                                iduser: obj.iduser,
                                username: obj.username
                            },
                            role: {
                                idrole: obj.idrole,
                                rolename: obj.rolename
                            }
                        }
                    })
                });
            }
        });
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

    async findRulesByRoleIdAsync(idrole: number): Promise<IDatabaseResult<RuleDto[]>> {
        let query = `SELECT trules.idrule
                          ,ruletype
                          ,CASE WHEN truleinroles.value IS NULL THEN trules.nullvalue ELSE truleinroles.value END AS value
                          ,@idrole AS idrole
                    FROM trules
                      LEFT JOIN truleinroles
                        ON trules.idrule = truleinroles.idrule AND truleinroles.idrole = @idrole`;
        return dbEngine.queryAsync<RuleDto>({text: query, values: {idrole}});
    }

    async findRulesByRoleIdRuleIdsAsync(idrole: number, idrules: string[]): Promise<IDatabaseResult<RuleDto[]>> {
        let query = `SELECT trules.idrule
                          ,ruletype
                          ,CASE WHEN truleinroles.value IS NULL THEN trules.nullvalue ELSE truleinroles.value END AS value
                          ,idrole
                    FROM trules
                      LEFT JOIN truleinroles
                        ON trules.idrule = truleinroles.idrule AND truleinroles.idrole = @idrole
                    WHERE trules.idrule IN (@idrules)
                    ORDER BY idrule`;
        return dbEngine.queryAsync<RuleDto>({text: query, values: {idrole, idrules}});
    }

    async updateRuleInRoleAsync(rule: RuleDto): Promise<IDatabaseResult<RuleDto>> {
        let query = `UPDATE truleinroles
                     SET value = @value
                     WHERE idrole=@idrole AND idrule=@idrule
                     RETURNING *`;
        return dbEngine.querySingleAsync<RuleDto>({text: query, values: rule});
    };

    async insertRuleInRoleAsync(rule: RuleDto): Promise<IDatabaseResult<RuleDto>> {
        let query = `INSERT INTO truleinroles
                       (idrule, idrole, value)
                     VALUES (@idrule, @idrole, @value)
                     RETURNING *`;
        return dbEngine.querySingleAsync<RuleDto>({text: query, values: rule});
    };
}
