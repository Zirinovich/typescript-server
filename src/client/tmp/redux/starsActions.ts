// import {IStarsAction} from '../../../shared/interfaces/defaultModule/IStarsAction';
import {IAction} from "../../_common/interfaces/IAction";

export const GET_REQUEST: string = 'stars/GET_REQUEST';
export const GET_SUCCESS: string = 'stars/GET_SUCCESS';
export const GET_FAILURE: string = 'stars/GET_FAILURE';

export interface IStarsAction extends IAction{
    payload: {
        count?: number;
        message?: any;
    };
}

/** Async Action Creator */
export function getStars() {
    return (dispatch) => {
        dispatch(starsRequest());
        return fetch('https://api.github.com/repos/barbar/vortigern')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                        .then((res) => dispatch(starsSuccess(res.stargazers_count)));
                } else {
                    return res.json()
                        .then((res) => dispatch(starsFailure(res)));
                }
            })
            .catch((err) => dispatch(starsFailure(err)));
    };
}

/** Action Creator */
export function starsRequest(): IAction {
    return {
        type: GET_REQUEST,
    };
}

/** Action Creator */
export function starsSuccess(count: number): IStarsAction {
    return {
        type: GET_SUCCESS,
        payload: {
            count,
        },
    };
}

/** Action Creator */
export function starsFailure(message: any): IStarsAction {
    return {
        type: GET_FAILURE,
        payload: {
            message,
        },
    };
}
