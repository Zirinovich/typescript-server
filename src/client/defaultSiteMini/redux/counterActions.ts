import {IAction} from '../../../shared/interfaces/common/IAction';

/** Action Types */
export const INCREMENT: string = 'counter/INCREMENT';
export const DECREMENT: string = 'counter/DECREMENT';

//#region Interfaces
export interface ICounterAction extends IAction{
    count?:number;
}
//#endregion

/** Action Creator: Increments the Counter */
export function increment(count: number): ICounterAction {
    return {
        type: INCREMENT,
        count
    };
}

/** Action Creator: Decrements the Counter */
export function decrement(): ICounterAction {
    return {
        type: DECREMENT,
    };
}
