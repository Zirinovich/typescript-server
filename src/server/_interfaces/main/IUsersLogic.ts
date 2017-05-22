import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {AccountDto} from "../../../shared/ajaxDto/authentication/AccountDto";

export interface IUsersLogic {
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    getAccountListAsync(): Promise<IDatabaseResult<AccountDto[]>>;
    findLoginByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginByIdAsync(id: number): Promise<IDatabaseResult<LoginDto>>;
    checkLoginAndFillSessionAsync(login: string, password: string, callback: (response: IDatabaseResult<SessionDto>)=>void): void;
    addChangeLoginAsync(login: LoginDto): Promise<IDatabaseResult<LoginDto>>;
}