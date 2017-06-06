import {IAction} from '../../_common/interfaces/IAction';
import {AccountDto} from '../../../shared/ajaxDto/authentication/AccountDto';

export interface IUsers {
    list: AccountDto[];
    item?: AccountDto;
}

export interface IGetUsersSuccessAction extends IAction {
    list: AccountDto[];
}

export interface IGetUsersFailureAction extends IAction {
    errorMessage: string;
}

export interface IGetUserByIdSuccessAction extends IAction {
    item: AccountDto;
}

export interface IGetUserByIdFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveUserFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteUserFailureAction extends IAction {
    errorMessage: string;
}