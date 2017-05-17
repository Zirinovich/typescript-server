import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";

export interface IUsersDatabase {
    findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByIdAsync(id: string): Promise<IDatabaseResult<LoginDto>>;
    findUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>>;
    findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>>;
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
}