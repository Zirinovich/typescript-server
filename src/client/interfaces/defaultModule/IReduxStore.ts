import {ICounter} from "./ICounter";
import {IStars} from "./IStars";

export interface IReduxStore {
    counter: ICounter;
    stars: IStars;
}
