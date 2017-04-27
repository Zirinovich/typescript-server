import {UserRoleEnum} from "./UserRoleEnum";

export interface IUserDto {
    fullName: string,
    username: string,
    role: UserRoleEnum
}
