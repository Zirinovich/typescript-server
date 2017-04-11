import * as React from 'react';

import '../../content/resolution-slider/resolution-slider.scss'

interface IProps {

}

interface IState {

}

export class RevolutionSlider extends React.Component<IProps, IState> {
    componentDidMount() {
        require('./jquery.themepunch.tools.min');

        let revapi = $('.tp-banner2').revolution(
            {
                delay: 9000,
                startwidth: 1170,
                startheight: 610,
                hideThumbs: 10,
                fullWidth: "on",
                navigationInGrid: "off",
                hideTimerBar: "on",
                navigationType: "none",
                navigationArrows: "solo",
                navigationStyle: "round",
                forceFullWidth: "on"
            });
    }

    public render() {
        return (
            <div>
                <div className="tp-banner-container">
                    <div className="tp-banner2">
                        <ul>
                            <li data-transition="fade" data-slotamount="1" data-masterspeed="1500"
                                data-thumb="images/sliders/slider1_thumb.jpg" data-delay="13000"
                                data-saveperformance="off" data-title="Our Workplace">

                                <img src="http://codelayers.net/foxuhost/layout2/fullwidth/images/sliders/slide2_bg.jpg"
                                     alt="kenburns1" data-bgposition="left center"
                                     data-kenburns="on" data-duration="14000" data-ease="Linear.easeNone"
                                     data-bgfit="100" data-bgfitend="130" data-bgpositionend="right center"/>

                                <div className="tp-caption lfl"
                                     data-x="0"
                                     data-y="30"
                                     data-speed="800"
                                     data-start="1000"
                                     data-easing="Back.easeOut"
                                     data-endspeed="300"
                                     data-captionhidden="on"
                                     style={{'z-index' : 5}}>
                                    <img
                                        src="http://codelayers.net/foxuhost/layout2/fullwidth/images/sliders/slide2_img1.png"
                                        alt=""/>
                                </div>
                                <div className="tp-caption offerbadge5 two sft"
                                     data-x="399"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="285"
                                     data-speed="800"
                                     data-start="1300"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}>Up to <br/>
                                    <span className="price">50%</span><br/>
                                    /Offer
                                </div>
                                <div className="tp-caption offerbadge4 sfb"
                                     data-x="460"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="340"
                                     data-speed="800"
                                     data-start="1600"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}>Starting at <br/>
                                    <span className="price">$4.99</span><br/>
                                    /mo
                                </div>
                                <div className="tp-caption text11 randomrotate customout tp-resizeme"
                                     data-x="665"
                                     data-y="125"
                                     data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
                                     data-speed="500"
                                     data-start="2200"
                                     data-easing="Power3.easeInOut"
                                     data-splitin="chars"
                                     data-splitout="chars"
                                     data-elementdelay="0.08"
                                     data-endelementdelay="0.08"
                                     data-endspeed="300"
                                     style={{'z-index': 7, 'max-width': 'auto', 'max-height': 'auto', 'white-space': 'nowrap'}}>
                                    unlimited
                                </div>
                                <div className="tp-caption text12 randomrotate customout tp-resizeme"
                                     data-x="665"
                                     data-y="185"
                                     data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
                                     data-speed="500"
                                     data-start="2200"
                                     data-easing="Power3.easeInOut"
                                     data-splitin="chars"
                                     data-splitout="chars"
                                     data-elementdelay="0.08"
                                     data-endelementdelay="0.08"
                                     data-endspeed="300"
                                     style={{'z-index': 7, 'max-width': 'auto', 'max-height': 'auto', 'white-space': 'nowrap'}}>
                                    Web Hosting
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="250"
                                     data-speed="800"
                                     data-start="2500"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    Unlimited Disk Space, Bandwidth and Email Addresses
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="280"
                                     data-speed="800"
                                     data-start="2800"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Domain Registration
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="310"
                                     data-speed="800"
                                     data-start="3100"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i> FREE Security Suite
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="340"
                                     data-speed="800"
                                     data-start="3300"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Site-Building Tools
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="370"
                                     data-speed="800"
                                     data-start="3600"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Search Engine and Marketing Credits
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="400"
                                     data-speed="800"
                                     data-start="3900"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i> FREE Security Suite
                                </div>
                                <div className="tp-caption slider_but1 sfb"
                                     data-x="665"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="465"
                                     data-speed="800"
                                     data-start="4200"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><a href="#">Get started</a></div>
                            </li>

                            <li data-transition="fade" data-slotamount="1" data-masterspeed="1500"
                                data-thumb="images/sliders/slider1_thumb.jpg" data-delay="13000"
                                data-saveperformance="off" data-title="Our Workplace">

                                <img src="http://placehold.it/1920x610" alt="kenburns1" data-bgposition="left center"
                                     data-kenburns="on" data-duration="14000" data-ease="Linear.easeNone"
                                     data-bgfit="100" data-bgfitend="130" data-bgpositionend="right center"/>

                                <div className="tp-caption lfr"
                                     data-x="700"
                                     data-y="25"
                                     data-speed="800"
                                     data-start="1000"
                                     data-easing="Back.easeOut"
                                     data-endspeed="300"
                                     data-captionhidden="on"
                                     style={{'z-index' : 8}}><img src="http://placehold.it/460x580" alt=""/></div>
                                <div className="tp-caption offerbadge5 two sft"
                                     data-x="650"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="140"
                                     data-speed="800"
                                     data-start="1300"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 9}}>Up to <br/>
                                    <span className="price two">50%</span><br/>
                                    /Offer
                                </div>
                                <div className="tp-caption offerbadge4 sfb"
                                     data-x="660"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="250"
                                     data-speed="800"
                                     data-start="1600"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 10}}>Starting at <br/>
                                    <span className="price">$4.99</span><br/>
                                    /mo
                                </div>
                                <div className="tp-caption text13 randomrotate customout tp-resizeme"
                                     data-x="0"
                                     data-y="135"
                                     data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
                                     data-speed="500"
                                     data-start="1400"
                                     data-easing="Power3.easeInOut"
                                     data-splitin="chars"
                                     data-splitout="chars"
                                     data-elementdelay="0.08"
                                     data-endelementdelay="0.08"
                                     data-endspeed="300"
                                     style={{'z-index': 7, 'max-width': 'auto', 'max-height': 'auto', 'white-space': 'nowrap'}}>
                                    Shared Hosting
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="185"
                                     data-speed="800"
                                     data-start="1900"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    Unlimited Disk Space, Bandwidth
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="220"
                                     data-speed="800"
                                     data-start="2000"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Domain Registration
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="255"
                                     data-speed="800"
                                     data-start="2100"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Security Suite
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="290"
                                     data-speed="800"
                                     data-start="2200"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Site-Building Tools
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="325"
                                     data-speed="800"
                                     data-start="2300"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Search Engine Credits
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="360"
                                     data-speed="800"
                                     data-start="2400"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    GREEN! Powered by 100% wind energy
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="185"
                                     data-speed="800"
                                     data-start="2500"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    Unlimited Disk Space, Bandwidth
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="220"
                                     data-speed="800"
                                     data-start="2600"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Domain Registration
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="255"
                                     data-speed="800"
                                     data-start="2700"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Security Suite
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="290"
                                     data-speed="800"
                                     data-start="2800"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Site-Building Tools
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="325"
                                     data-speed="800"
                                     data-start="2900"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    FREE Search Engine Credits
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="356"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="360"
                                     data-speed="800"
                                     data-start="3000"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-arrow-circle-right"></i>
                                    GREEN! 100% wind energy
                                </div>
                                <div className="tp-caption slider_but1 sfb"
                                     data-x="0"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="430"
                                     data-speed="800"
                                     data-start="3100"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><a href="#">Get started</a></div>
                            </li>

                            <li data-transition="fade" data-slotamount="1" data-masterspeed="1500"
                                data-thumb="images/sliders/slider1_thumb.jpg" data-delay="13000"
                                data-saveperformance="off" data-title="Our Workplace">

                                <img src="http://placehold.it/1920x610" alt="kenburns1" data-bgposition="left center"
                                     data-kenburns="on" data-duration="14000" data-ease="Linear.easeNone"
                                     data-bgfit="100" data-bgfitend="130" data-bgpositionend="right center"/>

                                <div className="tp-caption offerbadge4 sfl"
                                     data-x="825"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="335"
                                     data-speed="800"
                                     data-start="1600"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 10}}>Starting at <br/>
                                    <span className="price">$4.99</span><br/>
                                    /mo
                                </div>
                                <div className="tp-caption text11 randomrotate customout tp-resizeme"
                                     data-x="center"
                                     data-y="155"
                                     data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
                                     data-speed="500"
                                     data-start="1000"
                                     data-easing="Power3.easeInOut"
                                     data-splitin="chars"
                                     data-splitout="chars"
                                     data-elementdelay="0.08"
                                     data-endelementdelay="0.08"
                                     data-endspeed="300"
                                     style={{'z-index': 7, 'max-width': 'auto', 'max-height': 'auto', 'white-space': 'nowrap'}}>
                                    Reliable and
                                </div>
                                <div className="tp-caption text12 randomrotate customout tp-resizeme"
                                     data-x="center"
                                     data-y="210"
                                     data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
                                     data-speed="500"
                                     data-start="1000"
                                     data-easing="Power3.easeInOut"
                                     data-splitin="chars"
                                     data-splitout="chars"
                                     data-elementdelay="0.08"
                                     data-endelementdelay="0.08"
                                     data-endspeed="300"
                                     style={{'z-index': 7, 'max-width': 'auto', 'max-height': 'auto', 'white-space': 'nowrap'}}>
                                    Affordable Web Hosting
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="center"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="260"
                                     data-speed="800"
                                     data-start="2500"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    Unlimited Disk Space, Bandwidth & Email Addresses
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="center"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="290"
                                     data-speed="800"
                                     data-start="2800"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Domain Registration
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="center"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="320"
                                     data-speed="800"
                                     data-start="3100"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Search Engine and Marketing Credits
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="center"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="350"
                                     data-speed="800"
                                     data-start="3400"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i> FREE Security Suite
                                </div>
                                <div className="tp-caption slide_list sfb"
                                     data-x="center"
                                     data-hoffset="0"
                                     data-voffset="-10"
                                     data-y="380"
                                     data-speed="800"
                                     data-start="3700"
                                     data-easing="Power4.easeOut"
                                     data-endspeed="300"
                                     data-endeasing="Power1.easeIn"
                                     data-captionhidden="off"
                                     style={{'z-index' : 6}}><i className="fa fa-check"></i>
                                    FREE Site-Building Tools
                                </div>
                            </li>
                        </ul>
                        <div className="tp-bannertimer"></div>
                    </div>
                </div>
            </div>
        );
    }
}