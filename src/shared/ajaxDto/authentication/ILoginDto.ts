import {UserRoleEnum} from "./UserRoleEnum";
import {UserStatusEnum} from "./UserStatusEnum";

export interface ILoginDto {
    idlogin: string,
    login: string,
    password: string,
    status: UserStatusEnum,
    idrole: UserRoleEnum,
    firstname: string,
    lastname: string
}