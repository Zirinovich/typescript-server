import {GET_PRESENTATIONS_SUCCESS, IGetPresentationsSuccessAction} from './presentationsActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: any[];
}

const initialState = {
    list: []
};


export function presentationsReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_PRESENTATIONS_SUCCESS:
            const {list} = <IGetPresentationsSuccessAction>action;
            return Object.assign({}, state, {list});
        default:
            return state;
    }
}
