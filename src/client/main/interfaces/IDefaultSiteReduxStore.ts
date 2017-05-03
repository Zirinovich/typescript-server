import {IScript} from '../../../client/_common/interfaces/IScript';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

export interface IDefaultSiteReduxStore {
    user?: IUserDto;
    form?: any;
    loadScript?: IScript;
}
