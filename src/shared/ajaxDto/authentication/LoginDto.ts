import {UserRoleEnum} from "./UserRoleEnum";
import {LoginStatusEnum} from "./LoginStatusEnum";

export interface LoginDto {
    idlogin: number,
    login: string,
    password: string,
    status: LoginStatusEnum,
    idrole: number,
    logincreated?: string,
    loginupdated?: string
}