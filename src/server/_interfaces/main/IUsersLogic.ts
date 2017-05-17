import {IUsersLogicErrorDto} from "../../../shared/ajaxDto/authentication/IUsersLogicErrorDto";
import {IAccountDto} from "../engine/dto/IAccountDto";
import {ISession} from "../engine/ISession";
import {IAuthenticationError} from "../../../shared/ajaxDto/authentication/IAuthenticationError";

export interface IUsersLogic {
    i: number;
    test(j: number);
    getList(callback: (error: IUsersLogicErrorDto, users: IAccountDto[])=>void): void;
    findUserByLogin(login: string, password: string, callback: Function): void;
    findUserById(id: string, callback: Function): void;
    checkUserAndFillSessionAsync(login: string, password: string, callback: (error: IAuthenticationError, session: ISession)=>void): void;
}