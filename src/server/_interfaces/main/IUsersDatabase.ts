import {LoginDto} from "../../../shared/ajaxDto/authentication/LoginDto";
export interface IUsersDatabase {
    findLoginDtoByLogin(username: string, callback: (error: any, databaseLogin: LoginDto)=>void): void;
    findLoginDtoById(id: string, callback: Function): void;
    getList(callback: (error: any, users: LoginDto[])=>void): void;
}