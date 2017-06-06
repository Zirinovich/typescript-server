import {IAction} from '../../_common/interfaces/IAction';
import {RoleDto} from '../../../shared/ajaxDto/authentication/RoleDto';

export interface IRoles{
    list: RoleDto[],
    item?: RoleDto
}

export interface IGetRolesSuccessAction extends IAction {
    list: RoleDto[];
}

export interface IGetRolesFailureAction extends IAction {
    errorMessage: string;
}

export interface IGetRoleByIdSuccessAction extends IAction {
    item: RoleDto;
}

export interface IGetRoleByIdFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveRoleFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteRoleFailureAction extends IAction {
    errorMessage: string;
}