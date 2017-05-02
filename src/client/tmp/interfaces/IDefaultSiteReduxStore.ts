import {ICounter} from "./ICounter";
import {IStars} from "./IStars";
import {IUserDto} from '../../../shared/ajaxDto/authentication/IUserDto';
import {IScript} from '../../_common/interfaces/IScript';
import {II18n} from "../../_common/interfaces/II18n";

export interface IDefaultSiteReduxStore {
    counter?: ICounter;
    stars?: IStars;
    user?: IUserDto;
    i18n?: II18n;
    form?: any;
    loadScript?: IScript;
}
