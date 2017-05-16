import {IScript} from '../../../client/_common/interfaces/IScript';
import {UserDto} from '../../../shared/ajaxDto/authentication/UserDto';

export interface IDefaultSiteReduxStore {
    user?: UserDto;
    form?: any;
    loadScript?: IScript;
}
