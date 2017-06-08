import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

import {Icon} from '../../../_common/components/icon/icon';
import {RevolutionSlider} from '../../../_common/components/revolutionSlider/revolutionSlider';
import {SectionHeader} from '../../components/section_header/sectionHeader';
import {SectionCards} from '../../components/section_cards/sectionCards';
import {SectionText} from '../../components/section_text/sectionText';
import {SectionClients} from '../../components/section_clients/sectionClients';
import {SectionOrderButton} from '../../components/section_order_button/sectionOrderButton';

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
                        style: {zIndex: 5, width: 500},
                        content: <img
                            src={require('../_app/content/logo.svg')}/>
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
                            15 лет<br/>опыта
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
                        content: <span>Группа компаний</span>
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
                        content: <LinkContainer to="/contacts">
                            <Button bsStyle="primary">Сделать заказ</Button>
                        </LinkContainer>
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

        const title = 'Что мы предлагаем';
        const subtitle = 'АНАЛИЗ, ПРОЕКТ, КАЧЕСТВЕННОЕ РЕШЕНИЕ';
        const cards = [
            {
                title: 'Презентация решений',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words',
                to: '/presentations'
            },
            {
                title: 'Партнеры',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words',
                to: '/partners'
            },
            {
                title: 'Продукты',
                icon: <Icon name="desktop"/>,
                text: 'Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words',
                to: '/products'
            },
            {
                title: 'Проектирование и консалтинг',
                icon: <Icon name="desktop"/>,
                text: 'Временный локальный или офшорный найм специалистов лучше всего подходит для регулирования размера команды и независимой экспертизы.',
                to: '/services#designing'
            },
            {
                title: 'Разработка ПО',
                icon: <Icon name="desktop"/>,
                text: 'ALT-LAN предоставляет полный спектр экономически эффективных IT-услуг организациям по всему миру, которые нуждаются в профессиональной технической поддержке различных сфер бизнеса.',
                to: '/services#development'
            },
            {
                title: 'Тестирование/Внедрение',
                icon: <Icon name="phone"/>,
                text: 'Тестирование - это наиболее объективный способ проверки и оценки программного обеспечения перед презентацией пользователям.',
                to: '/services#testing'
            }
        ];

        const textSectionTitle = 'Анализ, проект, качественное решение';
        const textSectionText = 'Группа компаний ALT-LAN - это лучший опыт по разработке и внедрению OSS, BSS, VAS решений для телекоммуникационных компаний. Мы предлагаем услуги в области Разработки ПО, внедрению собственной линейки OSS-продуктов и системной интеграции проверенных решений.';
        return (
            <div className={style.home}>
                <RevolutionSlider slides={slides}/>
                <SectionHeader title={title} subtitle={subtitle}/>
                <SectionCards cards={cards}/>
                <SectionOrderButton/>
                <SectionText title={textSectionTitle}
                             text={textSectionText}>
                    <LinkContainer to="/services">
                        <Button bsStyle="primary">Узнать больше</Button>
                    </LinkContainer>
                </SectionText>
                <SectionClients/>
            </div>
        );
    }
}

export {Home}
