import {UserRoleEnum} from "./UserRoleEnum";

export interface IUserDto {
    id?: string;
    fullName: string,
    username: string,
    role: UserRoleEnum
}
