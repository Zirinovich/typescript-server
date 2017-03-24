import {UserRoleEnum} from "./UserRoleEnum";

export interface IUser {
    fullName: string,
    username: string,
    role: UserRoleEnum
}
