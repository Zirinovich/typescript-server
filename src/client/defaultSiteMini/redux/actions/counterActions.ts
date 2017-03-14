import {ICounterAction} from '../../../../shared/interfaces/defaultModule/ICounterAction';

/** Action Types */
export const INCREMENT: string = 'counter/INCREMENT';
export const DECREMENT: string = 'counter/DECREMENT';

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
