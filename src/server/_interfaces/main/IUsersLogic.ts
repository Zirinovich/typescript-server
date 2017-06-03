import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";
import {RuleDto} from "../../../shared/ajaxDto/authentication/RuleDto";

export interface IUsersLogic {
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    findLoginByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginByIdAsync(id: number): Promise<IDatabaseResult<LoginDto>>;
    deleteLoginsAsync(ids: number[]): Promise<IDatabaseResult<number>>
    addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;

    addChangeUserAsync(login: UserDto): Promise<IDatabaseResult<UserDto>>;

    getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>>;

    checkLoginAndFillSessionAsync(login: string, password: string, callback: (response: IDatabaseResult<SessionDto>)=>void): void;

    findRulesByRoleIdAsync(idrole: number): Promise<IDatabaseResult<RuleDto[]>>;
    findRulesByRoleIdRuleIdsAsync(idrole: number, idrules: string[]): Promise<IDatabaseResult<RuleDto[]>>;
}
