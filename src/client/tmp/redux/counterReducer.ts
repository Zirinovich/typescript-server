import {ICounter} from '../interfaces/ICounter';
import {INCREMENT, DECREMENT, ICounterAction} from './counterActions';
import {IAction} from "../../_common/interfaces/IAction";

const initialState: ICounter = {
    count: 0,
};

export function counterReducer(state = initialState, action?: IAction): ICounter {
    switch (action.type) {
        case INCREMENT:
            let {count} = <ICounterAction>action;
            return {
                count: state.count + count + _.random(1,9)
            };

        case DECREMENT:
            return {
                count: ((state.count - 1 > 0) ? state.count - 1 : 0),
            };

        default:
            return state;
    }
}
