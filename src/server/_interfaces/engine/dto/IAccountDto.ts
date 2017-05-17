import {UserDto} from '../../../../shared/ajaxDto/authentication/UserDto';
import {UserRoleEnum} from "../../../../shared/ajaxDto/authentication/UserRoleEnum";
import {LoginStatusEnum} from "../../../../shared/ajaxDto/authentication/LoginStatusEnum";

export interface IAccountDto extends UserDto {
    id: string,
    username: string,
    role: UserRoleEnum,
    status: LoginStatusEnum
}