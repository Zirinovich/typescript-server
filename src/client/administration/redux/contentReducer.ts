import {IAction} from '../../_common/interfaces/IAction';
import {
    GET_CONTENT_SUCCESS,
    GET_CONTENT_BY_ID_SUCCESS,
} from './contentActions';
import {
    IContent,
    IGetContentSuccessAction,
    IGetContentByIdSuccessAction,
} from '../interfaces/IContent';

const initialState = {
    list: []
};

export function contentReducer(state: IContent = initialState, action: IAction) {
    switch (action.type) {
        case GET_CONTENT_SUCCESS:
            const {list} = <IGetContentSuccessAction>action;
            return Object.assign({}, state, {list});
        case GET_CONTENT_BY_ID_SUCCESS:
            const {item} = <IGetContentByIdSuccessAction>action;
            return Object.assign({}, state, {item});
        default:
            return state;
    }
}
