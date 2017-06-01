import {ContentDto} from '../../../shared/ajaxDto/authentication/ContentDto';
import {GET_CONTENT_SUCCESS, GET_CONTENT_BY_ID_SUCCESS, IGetContentSuccessAction, IGetContentByIdSuccessAction} from './contentActions';
import {IAction} from '../../_common/interfaces/IAction';

interface IState {
    list: ContentDto[];
    item?: ContentDto;
}

const initialState = {
    list: []
};

export function contentReducer(state: IState = initialState, action: IAction) {
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
