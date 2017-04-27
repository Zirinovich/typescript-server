import {ICounter} from "../../../client/defaultSiteMini/interfaces/ICounter";
import {IStars} from "../../../client/defaultSiteMini/interfaces/IStars";
import {II18n} from "../../common/interfaces/II18n";
import {IScript} from '../../../client/common/interfaces/IScript';
import {IUserDto} from "../../../shared/ajaxDto/authentication/IUserDto";

export interface IDefaultSiteReduxStore {
    counter?: ICounter;
    stars?: IStars;
    user?: IUserDto;
    i18n?: II18n;
    form?: any;
    loadScript?: IScript;
}
