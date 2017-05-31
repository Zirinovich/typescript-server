import {IAction} from '../../_common/interfaces/IAction';

export const GET_PRESENTATIONS_REQUEST: string = 'presentations/GET_PRESENTATIONS_REQUEST';
export const GET_PRESENTATIONS_SUCCESS: string = 'presentations/GET_PRESENTATIONS_SUCCESS';
export const GET_PRESENTATIONS_FAILURE: string = 'presentations/GET_PRESENTATIONS_FAILURE';
export const GET_PRESENTATION_BY_ID_REQUEST: string = 'presentations/GET_PRESENTATION_BY_ID_REQUEST';
export const GET_PRESENTATION_BY_ID_SUCCESS: string = 'presentations/GET_PRESENTATION_BY_ID_SUCCESS';
export const GET_PRESENTATION_BY_ID_FAILURE: string = 'presentations/GET_PRESENTATION_BY_ID_FAILURE';

export interface IGetPresentationsSuccessAction extends IAction {
    list: any[];
}

export interface IGetPresentationsFailureAction extends IAction {
    errorMessage: string;
}

export interface IGetPresentationByIdSuccessAction extends IAction {
    item: any;
}

export interface IGetPresentationByIdFailureAction extends IAction {
    errorMessage: string;
}

let presentations = [
    {
        id: 1,
        src: require('./content/supr.png'),
        title: 'Система управления плановыми работами (СУПР)',
        text: 'Тикет-система',
        classes: ['trouble-ticket-system']
    },
    {
        id: 2,
        src: require('./content/ellco.png'),
        title: 'Личный кабинет Ellco',
        text: '',
        classes: ['dashboard']
    },
    {
        id: 3,
        src: require('./content/tele2.png'),
        title: 'Система тикетов Tele2',
        text: 'Система тикетов',
        classes: ['trouble-ticket-system']
    },
    {
        id: 4,
        src: require('./content/ladony.png'),
        title: 'Сайт ladony.ru',
        text: '',
        classes: ['site']
    }
];

export function getPresentations() {
    return async(dispatch) => {
        dispatch(getPresentationsRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {

                dispatch(getPresentationsSuccess(presentations));
            } else {
                //let errText = await response.text();
                //dispatch(getpresentationsFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(getPresentationsFailure(error));
        }
    };
}

export function getPresentationsRequest(): IAction {
    return {
        type: GET_PRESENTATIONS_REQUEST
    };
}

export function getPresentationsSuccess(list): IGetPresentationsSuccessAction {
    return {
        type: GET_PRESENTATIONS_SUCCESS,
        list
    };
}

export function getPresentationsFailure(message): IGetPresentationsFailureAction {
    return {
        type: GET_PRESENTATIONS_FAILURE,
        errorMessage: message
    };
}

export function getPresentationById(id) {
    return async(dispatch) => {
        dispatch(getPresentationByIdRequest());

        try {
            //let response = await fetch('https://api.github.com/repos/barbar/vortigern');
            let response = {ok: true};
            if (response.ok) {

                dispatch(getPresentationByIdSuccess(_.find(presentations, (p) => {
                    return p.id === id;
                })));
            } else {
                //let errText = await response.text();
                //dispatch(getpresentationsFailure('!!!Alarm!!! ' + errText));
                return "";
            }
        }
        catch (error) {
            dispatch(getPresentationByIdFailure(error));
        }
    };
}

export function getPresentationByIdRequest(): IAction {
    return {
        type: GET_PRESENTATION_BY_ID_REQUEST
    };
}

export function getPresentationByIdSuccess(item): IGetPresentationByIdSuccessAction {
    return {
        type: GET_PRESENTATION_BY_ID_SUCCESS,
        item
    };
}

export function getPresentationByIdFailure(message): IGetPresentationByIdFailureAction {
    return {
        type: GET_PRESENTATION_BY_ID_FAILURE,
        errorMessage: message
    };
}