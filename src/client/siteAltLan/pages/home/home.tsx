import * as React from 'react';
import {Button} from 'react-bootstrap';

import {Icon} from '../../../common/components/icon/icon';
import {RevolutionSlider} from "../../../common/components/revolutionSlider/revolutionSlider";
import {CardsSection} from '../../components/cards_section/cardsSection';
import {TextSection} from '../../components/text_section/textSection';

const style = require('./home.scss');

class Home extends React.Component<any, any> {
    public render() {
        const slides = [
            {
                src: 'http://codelayers.net/foxuhost/layout2/fullwidth/images/sliders/slide2_bg.jpg',
                captions: [
                    {
                        classes: 'lfl',
                        x: 0,
                        y: 30,
                        speed: 800,
                        start: 100,
                        easing: 'Back.easeOut',
                        endspeed: 300,
                        captionhidden: 'on',
                        style: {zIndex: 5},
                        content: <img
                            src="http://codelayers.net/foxuhost/layout2/fullwidth/images/sliders/slide2_img1.png"/>
                    },
                    {
                        classes: 'offerbadge5 two sft',
                        x: 399,
                        y: 285,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 1300,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            15<br/>лет<br/>опыта
                        </span>
                    },
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
                            Точные<br/>телеком<br/>решения
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
                        content: <span></span>
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
                        content: <span>ALT-LAN</span>
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
                            <Icon name="check"/> Точные телеком решения
                        </span>
                    },
                    {
                        classes: 'slide_list sfb',
                        x: 665,
                        y: 280,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 2800,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <Icon name="check"/> Лучшая аналитика
                        </span>
                    },
                    {
                        classes: 'slide_list sfb',
                        x: 665,
                        y: 310,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 3100,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <Icon name="check"/> Качественная разработка
                        </span>
                    },
                    {
                        classes: 'slide_list sfb',
                        x: 665,
                        y: 340,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 3300,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <Icon name="check"/> Современный дизайн
                        </span>
                    },
                    {
                        classes: 'slide_list sfb',
                        x: 665,
                        y: 370,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 3600,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <Icon name="check"/> Фантастическое юзабилити
                        </span>
                    },
                    {
                        classes: 'slide_list sfb',
                        x: 665,
                        y: 400,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 3900,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <span>
                            <Icon name="check"/> Анализ, проект, качественное решение
                        </span>
                    },
                    {
                        classes: 'slider_but1 sfb',
                        x: 665,
                        y: 465,
                        hoffset: 0,
                        voffset: -10,
                        speed: 800,
                        start: 4200,
                        easing: 'Power4.easeOut',
                        endeasing: 'Power1.easeIn',
                        endspeed: 300,
                        captionhidden: 'off',
                        style: {zIndex: 6},
                        content: <Button bsStyle="primary">Сделать заказ</Button>
                    }
                ]
            },
            {
                src: require('./content/zwalls.ru-35490.jpg'),
                captions: [
                    {
                        classes: 'lfl',
                        x: 0,
                        y: 30,
                        speed: 800,
                        start: 100,
                        easing: 'Back.easeOut',
                        endspeed: 300,
                        captionhidden: 'on',
                        style: {zIndex: 5},
                        content: <img
                            src={require('./content/halal.png')}/>
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
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap', color: '#fff'},
                        content: <span>Только Халяль</span>
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
                        style: {zIndex: 7, maxWidth: 'auto', maxHeight: 'auto', whiteSpace: 'nowrap', color: '#fff'},
                        content: <span>ALT-LAN</span>
                    }
                ]
            }
        ];

        const cardsSectionTitle = 'What We Offer';
        const cardsSectionSubtitle = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue';
        const cards = [
            {
                title: 'Dedicated Servers',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            },
            {
                title: 'Shared Hosting',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            },
            {
                title: 'Reseller Hosting',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            },
            {
                title: 'Domain Transfer',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            },
            {
                title: 'Linux or Windows',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            },
            {
                title: '24/7 Excellent Support',
                icon: <Icon name="phone"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words'
            }
        ];

        const textSectionTitle = 'Анализ, проект, качественное решение';
        const textSectionText = 'Группа компаний ALT-LAN - это лучший опыт по разработке и внедрению OSS, BSS, VAS решений для телекоммуникационных компаний. Мы предлагаем услуги в области Разработки ПО, внедрению собственной линейки OSS-продуктов и системной интеграции проверенных решений.';
        return (
            <div className={style.home}>
                <RevolutionSlider slides={slides}/>
                <CardsSection title={cardsSectionTitle} subtitle={cardsSectionSubtitle} cards={cards}/>
                <TextSection title={textSectionTitle} text={textSectionText} button={<Button bsStyle="primary">Узнать больше</Button>}/>
            </div>
        );
    }
}

export {Home}
