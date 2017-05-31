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
        content: '<div id="lipsum"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non bibendum ante. Phasellus massa erat, dapibus a odio eget, malesuada tincidunt nisi. Suspendisse pulvinar convallis ipsum, bibendum ultrices erat maximus at. Sed pulvinar finibus suscipit. Nullam eget augue id nibh luctus malesuada. Quisque ac blandit tortor, eu finibus lectus. Nam eget mauris a magna interdum tincidunt sed tincidunt mi. Praesent a erat ut purus fermentum aliquam vitae vitae nisl. Fusce sit amet mi augue. Quisque faucibus rutrum venenatis. Pellentesque vitae semper urna.<p>Ut vitae sem diam. Etiam iaculis convallis purus eu placerat. Sed scelerisque libero magna. Donec ultrices tincidunt tellus, a vestibulum mauris finibus a. Praesent ut convallis enim. Praesent tempus pellentesque ligula, quis sollicitudin leo scelerisque eu. Nullam id nibh in ex egestas porttitor ac sit amet risus. Proin pellentesque massa quis elit mattis euismod. Suspendisse eget varius dui. Phasellus pharetra libero a pretium ullamcorper. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p><p>Cras eget efficitur quam, nec fringilla nisl. Cras egestas orci sit amet eros auctor, a tempor nibh tempor. Donec varius eget eros et porttitor. Donec lobortis massa in volutpat tempor. Vestibulum eget venenatis urna. Vestibulum hendrerit a nibh ut congue. Cras lobortis facilisis lacus, id vehicula ligula laoreet eu. Nam a enim quis libero feugiat ullamcorper. Nullam consectetur odio ut ante molestie, suscipit molestie mi volutpat. Nam accumsan turpis sit amet quam commodo euismod.<p>Nam pharetra ultrices tincidunt. Proin a hendrerit quam. Nulla magna turpis, condimentum sit amet ullamcorper porttitor, tincidunt a ex. Donec eget nisi risus. Curabitur vel egestas nisl. Etiam venenatis ante sit amet orci tristique, ac sollicitudin massa consequat. Pellentesque at nulla blandit, blandit neque quis, egestas lectus. Integer porta accumsan pretium. Aenean elementum rhoncus erat ac condimentum. Nulla nisi mauris, malesuada eu nisl sodales, gravida bibendum sem.</p><p>Nullam pretium augue non tortor aliquet, tincidunt sagittis ligula elementum. Morbi rhoncus ante ex, et facilisis sem condimentum eu. Vivamus nec lectus placerat, luctus turpis iaculis, mattis elit. Proin ultrices dictum ipsum, a pharetra arcu vehicula et. Curabitur vel mauris magna. Pellentesque varius sapien porta turpis sollicitudin pharetra. Sed sit amet lobortis ligula, vitae commodo est. Duis nec neque vel ipsum dignissim consectetur. Etiam at lectus a massa facilisis scelerisque ut non tellus. In lobortis orci felis, at dapibus massa feugiat eget. Mauris sodales arcu eu velit dapibus, eget ultricies neque eleifend. Ut viverra laoreet nunc, sed auctor quam placerat ac.</p></div>',
        classes: ['trouble-ticket-system'],
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
                src: require('./content/ticket.png'),
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
        slides: [
            {
                src: require('./content/tele2.png')
            }
        ]
    },
    {
        id: 4,
        src: require('./content/ladony.png'),
        title: 'Сайт ladony.ru',
        text: '',
        classes: ['site'],
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
                console.log(id, item);
                dispatch(getPresentationByIdSuccess(item));
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