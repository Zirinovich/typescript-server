import {IUsersLogicErrorDto} from "../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {IAccountDto} from "../engine/dto/IAccountDto";
export interface IUsersLogic {
    i: number;
    test(j: number);
    getList(callback: (error: IUsersLogicErrorDto, users: IAccountDto[])=>void): void;
    findUserByLoginPassword(login: string, password: string, callback: Function): void;
    findUserById(id: string, callback: Function): void;
}