import {Fetcher} from '../../../shared/classes/Fetcher';
import {ContentDto} from '../../../shared/ajaxDto/authentication/ContentDto';
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
        classes: ['trouble-ticket-system'],
        idcontent: 'presentation_supr',
        slides: [
            {
                src: require('./content/supr.png'),
                captions: [
                    {
                        classes: 'text11 randomrotate customout tp-resizeme',
                        x: 400,
                        y: 350,
                        customout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
                        speed: 500,
                        start: 2200,
                        easing: 'Power3.easeInOut',
                        splitin: 'chars',
                        splitout: 'chars',
                        elementdelay: 0.08,
                        endelementdelay: 0.08,
                        endspeed: 300,
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap'},
                        content: 'Легенда Ростелекома'
                    },
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 400,
                        y: 400,
                        customout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
                        speed: 500,
                        start: 2200,
                        easing: 'Power3.easeInOut',
                        splitin: 'chars',
                        splitout: 'chars',
                        elementdelay: 0.08,
                        endelementdelay: 0.08,
                        endspeed: 300,
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap'},
                        content: 'СУПР'
                    }
                ]
            },
            {
                src: require('./content/supr2.png'),
                captions: [
                    {
                        classes: 'text11 randomrotate customout tp-resizeme',
                        x: 100,
                        y: 125,
                        customout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
                        speed: 500,
                        start: 2200,
                        easing: 'Power3.easeInOut',
                        splitin: 'chars',
                        splitout: 'chars',
                        elementdelay: 0.08,
                        endelementdelay: 0.08,
                        endspeed: 300,
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap'},
                        content: 'Фантастическое юзабилити'
                    },
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 100,
                        y: 185,
                        customout: 'x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;',
                        speed: 500,
                        start: 2200,
                        easing: 'Power3.easeInOut',
                        splitin: 'chars',
                        splitout: 'chars',
                        elementdelay: 0.08,
                        endelementdelay: 0.08,
                        endspeed: 300,
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap'},
                        content: 'Заявка СУПР'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        src: require('./content/ellco.png'),
        title: 'Личный кабинет Ellco',
        text: '',
        classes: ['dashboard'],
        idcontent: 'presentation_ellco',
        slides: [
            {
                src: require('./content/ellco.png')
            }
        ]
    },
    {
        id: 3,
        src: require('./content/tele2.png'),
        title: 'Система тикетов Tele2',
        text: 'Система тикетов',
        classes: ['trouble-ticket-system'],
        idcontent: 'presentation_tele2',
        slides: [
            {
                src: require('./content/tele2.png')
            }
        ]
    },
    {
        id: 4,
        src: require('./content/ttm.png'),
        title: 'TTM',
        text: 'Trouble Ticket Management (управление инцидентами и проблемами)',
        classes: ['trouble-ticket-system'],
        idcontent: '',
        slides: [
            {
                src: require('./content/ttm.png')
            },
            {
                src: require('./content/ttm2.png')
            },
            {
                src: require('./content/ttm3.png')
            },
            {
                src: require('./content/ttm4.png')
            }
        ]
    },
    {
        id: 5,
        src: require('./content/schlo.png'),
        title: 'СЧЛО',
        text: 'Система частотно-лицензионного обеспечения',
        classes: ['trouble-ticket-system'],
        idcontent: '',
        slides: [
            {
                src: require('./content/schlo.png')
            }
        ]
    },
    {
        id: 6,
        src: require('./content/alnot.png'),
        title: 'ALNOT',
        text: 'Система группового оповещения',
        classes: ['alert-system'],
        idcontent: '',
        slides: [
            {
                src: require('./content/alnot.png')
            }
        ]
    },
    {
        id: 7,
        src: require('./content/erms.png'),
        title: 'ERMS',
        text: 'Trouble Ticket Management (управление инцидентами и проблемами)',
        classes: ['trouble-ticket-system'],
        idcontent: '',
        slides: [
            {
                src: require('./content/erms.png')
            }
        ]
    },
    {
        id: 8,
        src: require('./content/opl.png'),
        title: 'Operation Log (OPL)',
        text: 'Система учета плановых работ',
        classes: ['trouble-ticket-system'],
        idcontent: '',
        slides: [
            {
                src: require('./content/opl.png')
            }
        ]
    },
    {
        id: 9,
        src: require('./content/ladony.png'),
        title: 'Сайт ladony.ru',
        text: '',
        classes: ['site'],
        idcontent: 'presentation_ladony',
        slides: [
            {
                src: require('./content/ladony.png')
            }
        ]
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

                const item = _.find(presentations, (p) => {
                    return p.id === parseInt(id);
                });

                let content = '';
                if (item.idcontent) {
                    const response = await Fetcher.postAsync<ContentDto>({
                        url: '/api/main/content/findcontent',
                        data: {
                            idcontent: item.idcontent
                        }
                    });
                    content = response.data.filedata;
                }

                dispatch(getPresentationByIdSuccess(Object.assign(item, {
                    content
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