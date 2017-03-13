import {IStars} from '../../../../shared/interfaces/defaultModule/IStars';
import {IStarsAction} from '../../../../shared/interfaces/defaultModule/IStarsAction';
import {GET_REQUEST, GET_SUCCESS, GET_FAILURE} from '../actions/starsActions';

const initialState: IStars = {
    isFetching: false,
};

/** Reducer */
export function starsReducer(state = initialState, action: IStarsAction) {
    switch (action.type) {
        case GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case GET_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                count: action.payload.count,
            });

        case GET_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                message: action.payload.message,
                error: true,
            });

        default:
            return state;
    }
}
