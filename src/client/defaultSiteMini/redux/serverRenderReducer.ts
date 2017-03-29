import {IArticle} from '../../../shared/interfaces/defaultModule/IArticle';
import {IAction} from '../../../shared/interfaces/defaultModule/IAction';
import {ARTICLE_GET_REQUEST, ARTICLE_GET_SUCCESS, IArticleAction, ARTICLE_GET_FAILURE} from './serverRenderActions';

const initialState: IArticle = {
    isFetching: false
};

export function articleReducer(state: IArticle = initialState, action: IAction) {
    switch (action.type) {
        case ARTICLE_GET_REQUEST:
            return Object.assign({}, state, {isFetching: true});

        case ARTICLE_GET_SUCCESS:
            let {payload:{text}} = <IArticleAction>action;
            return Object.assign({}, state, {
                isFetching: false,
                text
            });

        case ARTICLE_GET_FAILURE:
            let {payload:{message}} = <IArticleAction>action;
            return Object.assign({}, state, {
                isFetching: false,
                message: message,
                error: true,
            });

        default:
            return state;
    }
}