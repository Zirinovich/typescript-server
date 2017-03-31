import {IArticle} from '../../../shared/interfaces/defaultModule/IArticle';
import {IAction} from '../../../shared/interfaces/common/IAction';
import {ARTICLE_GET_REQUEST, ARTICLE_GET_SUCCESS, IArticleAction, ARTICLE_GET_FAILURE} from './serverRenderActions';

const initialState: IArticle = {
    isFetching: 0
};

export function articleReducer(state: IArticle = initialState, action: IAction) {
    const {isFetching} = state;
    switch (action.type) {
        case ARTICLE_GET_REQUEST:
            return {isFetching: isFetching + 1};
        case ARTICLE_GET_SUCCESS:
            return {isFetching: isFetching ? isFetching - 1 : 0};

        case ARTICLE_GET_FAILURE:
            let {errorMessage} = <IArticleAction>action;
            return Object.assign({}, state, {
                isFetching: isFetching ? isFetching - 1 : 0,
                message: errorMessage,
            });

        default:
            return state;
    }
}