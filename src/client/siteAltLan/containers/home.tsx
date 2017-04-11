import * as React from 'react';

const style = require('./home.scss');
import {RevolutionSlider} from '../../common/components/revolutionSlider/revolutionSlider';
import {Icon} from "../../common/components/icon/icon";

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

        return (
            <div className={style.Home}>
                <RevolutionSlider slides={slides}/>

                <div className="section_holder38">
                    <div className="container">
                        <h1 className="lt_title_big">What We <span>Offer</span></h1>
                        <div className="cl_title_line"></div>
                        <p className="lt_title_bottomtext">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue</p>
                        <div className="clearfix"></div>
                        <div className="one_third">
                            <div className="text_holder">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe03f;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">Dedicated Servers</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>

                        <div className="one_third">
                            <div className="text_holder active">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe09b;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">Shared Hosting</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>

                        <div className="one_third last">
                            <div className="text_holder">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe001;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">Reseller Hosting</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>

                        <div className="margin_top1"></div>
                        <div className="one_third">
                            <div className="text_holder">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe03f;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">Domain Transfer</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>

                        <div className="one_third">
                            <div className="text_holder">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe09b;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">Linux or Windows</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>

                        <div className="one_third last">
                            <div className="text_holder">
                                <div className="icon"><span className="glyph-item mega" aria-hidden="true"
                                                            data-icon="&#xe001;"></span>
                                    <div className="arrow"></div>
                                </div>
                                <div className="text">
                                    <h4 className="lessmar">24/7 Excellent Support</h4>
                                    <p>
                                        Lorem Ipsum is simply dummy text  of theprinting and typesetting it has the randomised words</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section_holder34">
                    <div className="container">
                        <h1 className="title1">7 Diffrent</h1>
                        <h1 className="title2"> Hosting Layouts</h1>
                        <br/>
                        <p className="cont">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Suspendisse et justo. Praesent mattis commodo augue. Aliquam ornare hendrerit augue. Cras tellus. In pulvinar lectus a est. Curabitur eget orci. Cras laoreet ligula. Etiam sit amet dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere.</p>
                        <div className="margin_top4"></div>
                        <a href="#" className="readmore_but9">Purchase now!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export {Home}
