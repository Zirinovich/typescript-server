import {ICounter} from "./ICounter";
import {IStars} from "./IStars";
import {IUser} from '../authentication/IUser';

export interface IReduxStore {
    counter?: ICounter;
    stars?: IStars;
    account?: IUser
}
