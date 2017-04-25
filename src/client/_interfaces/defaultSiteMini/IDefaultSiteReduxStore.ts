import {ICounter} from "./ICounter";
import {IStars} from "./IStars";
import {II18n} from "./II18n";
import {IUser} from '../authentication/IUser';
import {IScript} from '../common/IScript';

export interface IDefaultSiteReduxStore {
    counter?: ICounter;
    stars?: IStars;
    user?: IUser;
    i18n?: II18n;
    form?: any;
    loadScript?: IScript;
}
