import {IScript} from '../../../client/_common/interfaces/IScript';
import {SessionDto} from "../../../shared/ajaxDto/authentication/SessionDto";

export interface IMainSiteReduxStore {
    session?: SessionDto;
    form?: any;
}
