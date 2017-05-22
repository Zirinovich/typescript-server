import {LoginStatusEnum} from "./LoginStatusEnum";

export interface LoginDto {
    idlogin: number,
    login: string,
    password: string,
    status: string,
    idrole: number,
    logincreated?: string,
    loginupdated?: string
}