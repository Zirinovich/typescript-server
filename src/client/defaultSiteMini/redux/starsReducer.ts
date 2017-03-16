import {IStars} from '../../../shared/interfaces/defaultModule/IStars';
import {GET_REQUEST, GET_SUCCESS, GET_FAILURE, IStarsAction} from './starsActions';
import {IAction} from "../../../shared/interfaces/defaultModule/IAction";

const initialState: IStars = {
    isFetching: false,
};

/** Reducer */
export function starsReducer(state: IStars = initialState, action: IAction) {
    switch (action.type) {
        case GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case GET_SUCCESS:
            let {payload:{count}} = <IStarsAction>action; // это называется деструктуризация объекта, тут подробно: https://learn.javascript.ru/destructuring
            return Object.assign({}, state, {
                isFetching: false,
                count: count,
            });

        case GET_FAILURE:
            let {payload:{message}} = <IStarsAction>action;
            return Object.assign({}, state, {
                isFetching: false,
                message: message,
                error: true,
            });

        default:
            return state;
    }
}
