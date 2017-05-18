import {IUsersLogic} from "../../_interfaces/main/IUsersLogic";
import {usersDatabase} from "../../registration";
import {LoginStatusEnum} from "../../../shared/ajaxDto/authentication/LoginStatusEnum";
// import {IVerifyOptions} from "passport-local";
import {ErrorCodeEnum} from "../../../shared/classes/ErrorCodeEnum";
import {SessionDto} from "../../_interfaces/engine/dto/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../../_interfaces/engine/database/IDatabaseResult";

export class UsersLogic implements IUsersLogic {


    async getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>> {
        return usersDatabase.getLoginListAsync();
    }

    async checkLoginAndFillSessionAsync(login: string, password: string, callback: (response: IDatabaseResult<SessionDto>)=>void) {

        let loginResult = await usersDatabase.findLoginDtoByLoginAsync(login);
        if (loginResult.errorCode !== ErrorCodeEnum.NoErrors) {
            return callback({
                errorCode: loginResult.errorCode,
                errorMessage: loginResult.errorMessage || "InternalDatabaseError"
            });
        }
        if (!loginResult.data) {
            return callback({
                errorCode: ErrorCodeEnum.AuthNoSuchLoginError,
                errorMessage: "IncorrectLogin"
            });
        }
        if (loginResult.data.status === LoginStatusEnum.Disabled) {
            return callback({
                errorCode: ErrorCodeEnum.AuthLoginDisabledError,
                errorMessage: "LoginDisabled"
            });
        }
        if (loginResult.data.password !== password) {
            return callback({
                errorCode: ErrorCodeEnum.AuthWrongPasswordError,
                errorMessage: "WrongPassword"
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
}
