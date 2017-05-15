import {GET_CONTENT_SUCCESS, IGetContentSuccessAction} from './contentActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: any[];
}

const initialState = {
    list: []
};


export function contentReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_CONTENT_SUCCESS:
            const {list} = <IGetContentSuccessAction>action;
            return Object.assign({}, state, {list});
        default:
            return state;
    }
}
