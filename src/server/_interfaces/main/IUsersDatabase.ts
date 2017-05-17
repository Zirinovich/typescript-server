import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";

export interface IUsersDatabase {
    findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByIdAsync(id: string): Promise<IDatabaseResult<LoginDto>>;
    getListAsync(): Promise<IDatabaseResult<LoginDto>>;
}