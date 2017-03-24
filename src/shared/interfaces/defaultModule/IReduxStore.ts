import {ICounter} from "./ICounter";
import {IStars} from "./IStars";
import {IUser} from '../authentication/IUser';
import {IScript} from '../common/IScript';

export interface IReduxStore {
    counter?: ICounter;
    stars?: IStars;
    user?: IUser;
    form?: any;
    loadScript?: IScript;
}
