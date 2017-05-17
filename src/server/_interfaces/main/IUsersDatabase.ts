import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
import {IDatabaseResult} from "../engine/database/IDatabaseResult";
import {UserDto} from "../../../shared/ajaxDto/authentication/UserDto";

export interface IUsersDatabase {
    findLoginDtoByLoginAsync(login: string): Promise<IDatabaseResult<LoginDto>>;
    findLoginDtoByIdAsync(id: string): Promise<IDatabaseResult<LoginDto>>;
    getLoginListAsync(): Promise<IDatabaseResult<LoginDto[]>>;
    getUserByIdAsync(iduser: number): Promise<IDatabaseResult<UserDto>>;
}