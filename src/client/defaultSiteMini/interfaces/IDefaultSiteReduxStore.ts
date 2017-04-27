import {ICounter} from "./ICounter";
import {IStars} from "./IStars";
import {IUser} from '../../../shared/ajaxDto/authentication/IUser';
import {IScript} from '../../common/interfaces/IScript';
import {II18n} from "../../common/interfaces/II18n";

export interface IDefaultSiteReduxStore {
    counter?: ICounter;
    stars?: IStars;
    user?: IUser;
    i18n?: II18n;
    form?: any;
    loadScript?: IScript;
}
