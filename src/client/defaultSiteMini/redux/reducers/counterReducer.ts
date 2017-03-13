import {ICounter} from '../../../../shared/interfaces/defaultModule/ICounter';
import {ICounterAction} from '../../../../shared/interfaces/defaultModule/ICounterAction';

import {INCREMENT, DECREMENT} from '../actions/counterActions';

const initialState: ICounter = {
    count: 0,
};

export function counterReducer(state = initialState, action?: ICounterAction) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + action.count,
            };

        case DECREMENT:
            return {
                count: ((state.count - 1 > 0) ? state.count - 1 : 0),
            };

        default:
            return state;
    }
}
