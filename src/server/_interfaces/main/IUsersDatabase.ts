import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";

export interface IUsersDatabase {
    findLoginDtoByIdAsync(idlogin: number): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByCredentialsAsync(idlogin: string, password: string): Promise<IDatabaseResult<LoginDto>>;
    findUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>>;
    findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>>;
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>>;
    addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;
}