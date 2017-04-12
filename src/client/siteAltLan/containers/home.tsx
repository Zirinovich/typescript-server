import * as React from 'react';

import {Icon} from '../../common/components/icon/icon';
import {RevolutionSlider} from "../../common/components/revolutionSlider/revolutionSlider";
import {CardsSection} from '../components/cardsSection';
import {ParallaxSection} from '../components/parallaxSection';
const style = require('./home.scss');

class Home extends React.Component<any, any> {
    public render() {
        const slides = [
            {
                src: 'http://codelayers.net/foxuhost/layout2/fullwidth/images/sliders/slide2_bg.jpg',
                alt: 'kenburns1',
                bgposition: 'left center',
                kenburns: 'off',
                duration: 14000,
                ease: 'Linear.easeNone',
                bgfit: 100,
                bgfitend: 130,
                bgpositionend: 'right center',
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
                            Up to <br/>
                            <span className="price">50%</span><br/>
                            /Offer
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
                            Starting at <br/>
                            <span className="price">$4.99</span><br/>
                            /mo
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
                        content: <span>unlimited</span>
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
                        content: <span>Web Hosting</span>
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
                            <Icon name="check"/> Unlimited Disk Space, Bandwidth and Email Addresses
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
                            <Icon name="check"/> FREE Domain Registration
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
                            <Icon name="check"/> FREE Security Suite
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
                            <Icon name="check"/> FREE Site-Building Tools
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
                            <Icon name="check"/> FREE Search Engine and Marketing Credits
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
                            <Icon name="check"/> FREE Security Suite
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
                        content: <a href="#">Get started</a>
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

        const parallaxSectionTitle = '7 Diffrent';
        const parallaxSectionSubtitle = 'Hosting Layouts';
        const parallaxSectionText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Curabitur eget orci. Cras laoreet ligula. Etiam sit amet dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.';
        return (
            <div className={style.home}>
                <RevolutionSlider slides={slides}/>
                <CardsSection title={cardsSectionTitle} subtitle={cardsSectionSubtitle} cards={cards}/>
                <ParallaxSection title={parallaxSectionTitle} subtitle={parallaxSectionSubtitle} text={parallaxSectionText}/>
            </div>
        );
    }
}

export {Home}
