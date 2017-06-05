import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RoleDto} from "../../../shared/ajaxDto/authentication/RoleDto";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";

export interface IUsersDatabase {
    findLoginDtoByIdAsync(idlogin: number): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByCredentialsAsync(idlogin: string, password: string): Promise<IDatabaseResult<LoginDto>>;
    findUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>>;
    findRoleByIdAsync(idrole: number): Promise<IDatabaseResult<RoleDto>>;
    updateRoleAsync(role: RoleDto): Promise<IDatabaseResult<RoleDto>>;
    insertRoleAsync(role: RoleDto): Promise<IDatabaseResult<RoleDto>>
    deleteRolesAsync(ids: number[]): Promise<IDatabaseResult<RoleDto[]>>
    getRoleList(): Promise<IDatabaseResult<RoleDto[]>>;
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>>;
    findAccountByLoginId(idlogin: number): Promise<IDatabaseResult<AccountDto>>;

    addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;

    insertLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;
    updateLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;
    deleteLoginAsync(id: number): Promise<IDatabaseResult<{idlogin: number}>>;
    deleteLoginsAsync(ids: number[]): Promise<IDatabaseResult<{idlogin: number}[]>>;

    insertUserAsync(user: UserDto): Promise<IDatabaseResult<UserDto>>;
    updateUserAsync(user: UserDto): Promise<IDatabaseResult<UserDto>>;

    findRulesByRoleIdAsync(idrule: number): Promise<IDatabaseResult<RuleDto[]>>;
    findRulesByRoleIdRuleIdsAsync(idrole: number, idrules: string[]): Promise<IDatabaseResult<RuleDto[]>>;
    updateRuleInRoleAsync(rule: RuleDto): Promise<IDatabaseResult<RuleDto>>;
    insertRuleInRoleAsync(rule: RuleDto): Promise<IDatabaseResult<RuleDto>>;
}