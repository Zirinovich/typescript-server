import {
    GET_PRESENTATIONS_SUCCESS,
    GET_PRESENTATION_BY_ID_SUCCESS,
    IGetPresentationsSuccessAction,
    IGetPresentationByIdSuccessAction
} from './presentationsActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: any[];
    item?: any;
}

const initialState: IState = {
    list: [],
    item: {}
};


export function presentationsReducer(state: IState = initialState, action: IAction) {
    switch (action.type) {
        case GET_PRESENTATIONS_SUCCESS:
            const {list} = <IGetPresentationsSuccessAction>action;
            return Object.assign({}, state, {list});
        case GET_PRESENTATION_BY_ID_SUCCESS:
            const {item} = <IGetPresentationByIdSuccessAction>action;
            return Object.assign({}, state, {item});
        default:
            return state;
    }
}
