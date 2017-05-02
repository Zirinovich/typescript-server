import {II18n} from '../../_common/interfaces/II18n';
import {IScript} from '../../../client/_common/interfaces/IScript';
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';

export interface IDefaultSiteReduxStore {
    user?: IUserDto;
    i18n?: II18n;
    form?: any;
    loadScript?: IScript;
}
