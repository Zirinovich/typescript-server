import {IUserDto} from '../../../../shared/ajaxDto/authentication/IUserDto';
import {UserRoleEnum} from "../../../../shared/ajaxDto/authentication/UserRoleEnum";
import {UserStatusEnum} from "../../../../shared/ajaxDto/authentication/UserStatusEnum";

export interface IAccountDto extends IUserDto {
    id: string,
    username: string,
    role: UserRoleEnum,
    status: UserStatusEnum
}