import {SessionDto} from "../engine/dto/SessionDto";
import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";

export interface IUsersLogic {
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    findLoginByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginByIdAsync(id: number): Promise<IDatabaseResult<LoginDto>>;
    checkLoginAndFillSessionAsync(login: string, password: string, callback: (response: IDatabaseResult<SessionDto>)=>void): void;
}