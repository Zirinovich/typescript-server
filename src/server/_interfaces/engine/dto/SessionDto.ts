import {UserDto} from "../../../../shared/ajaxDto/authentication/UserDto";
import {LoginDto} from "../../../../shared/ajaxDto/authentication/LoginDto";
import {RoleDto} from "../../../../shared/ajaxDto/authentication/RoleDto";
export interface SessionDto {
    login: LoginDto,
    user?: UserDto,
    role?: RoleDto
}