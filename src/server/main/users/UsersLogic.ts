import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {LoginStatusConstants} from "../../../shared/ajaxDto/authentication/LoginStatusConstants";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";

export class UsersLogic implements IUsersLogic {


    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        return usersDatabase.getLoginListAsync();
    }

    async findLoginByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>> {
        return usersDatabase.findLoginDtoByLoginAsync(login);
    }

    async findLoginByIdAsync(id: number): Promise<IDatabaseResult<LoginDto>> {
        return usersDatabase.findLoginDtoByIdAsync(id);
    }

    async deleteLoginsAsync(ids: number[]): Promise<IDatabaseResult<number>> {
        return new Promise<IDatabaseResult<number>>(async resolve => {
            let response = await usersDatabase.deleteLoginsAsync(ids);
            resolve(
                Object.assign({}, {...response}, {data: response.data ? response.data.length : undefined}));
        });
    }

    async findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>> {
        return usersDatabase.findRoleByIdAsync(idrole);
    }

    async addChangeRoleAsync(role: RoleDto): Promise<IDatabaseResult<RoleDto>> {
        return new Promise<IDatabaseResult<RoleDto>>(async(resolve) => {
            let changeResult = await usersDatabase.updateRoleAsync(role);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(changeResult);
            }
            let addResult = await usersDatabase.insertRoleAsync(role);
            resolve(addResult);
        });
    }

    async deleteRolesAsync(ids: number[]): Promise<IDatabaseResult<number>> {
        return new Promise<IDatabaseResult<number>>(async resolve => {
            let result: any = await usersDatabase.deleteRolesAsync(ids);
            if (result.errorCode !== ErrorCodeEnum.NoErrors || !result.data) {
                return resolve(result);
            }
            resolve(Object.assign({}, result, {data: result.data.length}))
        })
    }

    async findAccountByLoginId(idlogin: number): Promise<IDatabaseResult<AccountDto>> {
        return usersDatabase.findAccountByLoginId(idlogin);
    }

    async getRoleListAsync(): Promise<IDatabaseResult<RoleDto[]>> {
        return usersDatabase.getRoleList();
    }

    async addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>> {
        return new Promise<IDatabaseResult<LoginDto>>(async resolve => {
            let changeResult = await usersDatabase.updateLoginAsync(login);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(changeResult);
            }

            let addResult = await usersDatabase.insertLoginAsync(login);
            if (addResult.data || addResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(addResult);
            }
            resolve({
                errorCode: ErrorCodeEnum.UsersLoginExistsError,
                errorMessage: "LoginAlreadyExists",
            })
        });
    }

    async addChangeUserAsync(user: UserDto): Promise<IDatabaseResult<UserDto>> {
        return new Promise<IDatabaseResult<UserDto>>(async resolve => {
            let changeResult = await usersDatabase.updateUserAsync(user);
            if (changeResult.data || changeResult.errorCode !== ErrorCodeEnum.NoErrors) {
                return resolve(changeResult);
            }

            let addResult = await usersDatabase.insertUserAsync(user);
            resolve(addResult);
        });
    }

    async getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>> {
        return usersDatabase.getAccountListAsync();
    }

    async checkLoginAndFillSessionAsync(login: string, password: string, callback: (response: IDatabaseResult<SessionDto>)=>void) {

        let loginResult = await usersDatabase.findLoginDtoByCredentialsAsync(login, password);
        if (loginResult.errorCode !== ErrorCodeEnum.NoErrors) {
            return callback({
                errorCode: loginResult.errorCode,
                errorMessage: loginResult.errorMessage || "InternalDatabaseError"
            });
        }
        if (!loginResult.data) {
            return callback({
                errorCode: ErrorCodeEnum.AuthInvalidCredentialsError,
                errorMessage: "InvalidCredentials"
            });
        }
        if (loginResult.data.status === LoginStatusConstants.Disabled) {
            return callback({
                errorCode: ErrorCodeEnum.AuthLoginDisabledError,
                errorMessage: "LoginDisabled"
            });
        }
        let userResult = await usersDatabase.findUserByIdAsync(loginResult.data.idlogin);
        let roleResult = await usersDatabase.findRoleByIdAsync(loginResult.data.idrole);
        return callback({
            errorCode: ErrorCodeEnum.NoErrors,
            data: {
                login: loginResult.data,
                user: userResult.errorCode === ErrorCodeEnum.NoErrors && userResult.data,
                role: roleResult.errorCode === ErrorCodeEnum.NoErrors && roleResult.data
            }
        });
    }

    async findRulesByRoleIdAsync(idrole: number): Promise<IDatabaseResult<RuleDto[]>> {
        return usersDatabase.findRulesByRoleIdAsync(idrole);
    }

    async findRulesByRoleIdRuleIdsAsync(idrole: number, idrules: string[]): Promise<IDatabaseResult<RuleDto[]>> {
        return usersDatabase.findRulesByRoleIdRuleIdsAsync(idrole, idrules)
    }

    async addChangeRulesInRole(rules: RuleDto[]): Promise<IDatabaseResult<RuleDto[]>> {
        let promises = [];
        _.forEach(rules, rule => {
            promises.push(UsersLogic.addChangeRuleInRole(rule));
        });
        let results = await Promise.all(promises);
        let accepted = _.filter(results, o => o.errorCode === ErrorCodeEnum.NoErrors);
        if (accepted.length === rules.length) {
            return Promise.resolve({
                errorCode: ErrorCodeEnum.NoErrors,
                data: accepted.map(o => o.data)
            });
        }
        else {
            let errorMessage = results
                .filter(o => o.errorCode !== ErrorCodeEnum.NoErrors)
                .map(o => o.errorMessage)
                .join("\n");
            return Promise.resolve({
                errorCode: ErrorCodeEnum.DataBaseError,
                errorMessage
            })
        }
    }

    private static async addChangeRuleInRole(rule: RuleDto): Promise<IDatabaseResult<RuleDto>> {
        return new Promise<IDatabaseResult<RuleDto>>(async resolve => {
            let update = await usersDatabase.updateRuleInRoleAsync(rule);
            if (update.errorCode !== ErrorCodeEnum.NoErrors || update.data) {
                return resolve(update)
            }
            let insert = usersDatabase.insertRuleInRoleAsync(rule);
            resolve(insert);
        });
    }
}
