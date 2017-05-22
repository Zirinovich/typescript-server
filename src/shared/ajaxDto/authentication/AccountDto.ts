import {LoginDto} from "./LoginDto";
import {UserDto} from "./UserDto";
import {RoleDto} from "./RoleDto";

export interface AccountDto {
    login: LoginDto;
    user: UserDto;
    role: RoleDto;
}