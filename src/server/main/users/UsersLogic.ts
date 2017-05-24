import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {LoginStatusEnum} from "../../../shared/ajaxDto/authentication/LoginStatusEnum";
// import {IVerifyOptions} from "passport-local";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";
import {LoginStatusConstants} from "../../../shared/ajaxDto/authentication/LoginStatusConstants";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";

export class UsersLogic implements IUsersLogic {


    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        return usersDatabase.getLoginListAsync();
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

    async findLoginByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>> {
        return usersDatabase.findLoginDtoByLoginAsync(login);
    }

    async findLoginByIdAsync(id: number): Promise<IDatabaseResult<LoginDto>> {
        return usersDatabase.findLoginDtoByIdAsync(id);
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
}
