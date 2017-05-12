import {ILoginDto} from "../../../shared/ajaxDto/authentication/ILoginDto";
export interface IUsersDatabase {
    findUserByLogin(username: string, callback: (error: any, databaseLogin: ILoginDto)=>void): void;
    findUserById(id: string, callback: Function): void;
    getList(callback: (error: any, users: ILoginDto[])=>void): void;
}