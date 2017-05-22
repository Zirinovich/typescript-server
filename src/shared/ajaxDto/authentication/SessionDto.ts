import {UserDto} from './UserDto';
import {LoginDto} from './LoginDto';
import {RoleDto} from './RoleDto';

export interface SessionDto {
    login: LoginDto,
    user?: UserDto,
    role?: RoleDto
}