import * as React from 'react';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

import {RevolutionSlider} from '../../../_common/components/revolutionSlider/revolutionSlider';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {getPresentationById} from '../../redux/presentationsActions';

interface IProps {
    params?: any;
    routes?: any;
}

interface IState {

}

export class PresentationDetail extends React.Component<IProps, IState> {
    componentDidMount() {
        const {params, routes} = this.props;

    }

    render() {
        const {params, routes} = this.props;
        console.log(params, routes);
        const slides = [
            {
                src: require('./content/login_page.png'),
                captions: [
                    {
                        classes: 'offerbadge4 sfb',
                        x: 460,
                        y: 340,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 1600,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <br/>
                            СУПР
                        </span>
                    },
                    {
                        classes: 'text11 randomrotate customout tp-resizeme',
                        x: 665,
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
                        content: <span>Легенда Ростелекома</span>
                    },
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 665,
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
                        content: <span>СУПР</span>
                    },
                    {
                        classes: 'lfl',
                        x: 665,
                        y: 250,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 2500,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            (Система управления плановыми работами)
                        </span>
                    }
                ]
            },
            {
                src: require('./content/tickets_grid.png'),
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
                        content: <span>Реестр Заявок</span>
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
                        content: <span>СУПР</span>
                    },
                    {
                        classes: 'offerbadge4 sfb',
                        x: 150,
                        y: 340,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 1600,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            Заведены<br/>сотни тысячи<br/>заявок
                        </span>
                    }
                ]
            },
            {
                src: require('./content/users.png'),
                captions: [
                    {
                        classes: 'text11 randomrotate customout tp-resizeme',
                        x: 400,
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
                        content: <span>Тысячи пользователей</span>
                    },
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 400,
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
                        content: <span>Счастливы</span>
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
                        content: <span>Фантастическое юзабилити</span>
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
                        content: <span>Заявка СУПР</span>
                    }
                ]
            },
            {
                src: require('./content/compensation.png'),
                captions: [
                    {
                        classes: 'text11 randomrotate customout tp-resizeme',
                        x: 300,
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
                        content: <span>Возможность строить</span>
                    },
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 300,
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
                        content: <span>Компенсацию!</span>
                    }
                ]
            },
            {
                src: require('./content/IMG_13042017_154208_0.png'),
                captions: [
                    {
                        classes: 'text12 randomrotate customout tp-resizeme',
                        x: 300,
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
                        content: <span>Хайлауд</span>
                    }
                ]
            }
        ];

        return (
            <div>
                <RevolutionSlider slides={slides}/>
                <Breadcrumbs params={params} routes={routes}/>
            </div>
        )
    }
}