import {IAction} from '../../_common/interfaces/IAction';
import {ContentDto} from '../../../shared/ajaxDto/authentication/ContentDto';

export interface IContent {
    list: ContentDto[];
    item?: ContentDto;
}

export interface IGetContentSuccessAction extends IAction {
    list: any[];
}

export interface IGetContentFailureAction extends IAction {
    errorMessage: string;
}

export interface IGetContentByIdSuccessAction extends IAction {
    item: ContentDto;
}

export interface IGetContentByIdFailureAction extends IAction {
    errorMessage: string;
}

export interface ISaveRoleFailureAction extends IAction {
    errorMessage: string;
}

export interface IDeleteRoleFailureAction extends IAction {
    errorMessage: string;
}