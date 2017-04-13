import * as React from 'react';

import '../../content/resolution-slider/resolution-slider.scss'

interface IProps {
    slides: {
        src: string;
        alt?: string;
        bgposition?: string;
        kenburns?: string;
        duration?: number;
        ease?: string;
        bgfit?: number;
        bgfitend?: number;
        bgpositionend?: string;

        captions?: {
            classes?: string;
            x: number;
            y: number;
            hoffset?: number;
            voffset?: number;
            speed: number;
            start: number;
            easing: string;
            splitin?: string;
            splitout?: string;
            elementdelay?: number;
            endelementdelay?: number;
            endeasing ?: string;
            endspeed: number;
            captionhidden?: string;
            customout?: string;
            style?: React.CSSProperties,
            content: JSX.Element
        }[]
    }[]
}

interface IState {

}

export class RevolutionSlider extends React.Component<IProps, IState> {
    static isLoaded = false;

    static loadJsClient() {
        if (!RevolutionSlider.isLoaded) {
            require('./jquery.themepunch.tools.min');
            RevolutionSlider.isLoaded = true;
        }
    }

    componentDidMount() {
        RevolutionSlider.loadJsClient();

        let revapi = $('.tp-banner2').css({opacity: 1}).revolution(
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
        const {slides} = this.props;
        return (
            <div>
                <div className="tp-banner-container">
                    <div className="tp-banner2" style={{opacity: 0}}>
                        <ul>
                            {slides.map((slide, index) => {
                                return (
                                    <li key={index}
                                        data-transition="fade"
                                        data-slotamount="1"
                                        data-masterspeed="1500"
                                        data-thumb="images/sliders/slider1_thumb.jpg"
                                        data-delay="13000"
                                        data-saveperformance="off"
                                        data-title="Our Workplace">

                                        <img src={slide.src}
                                             alt={slide.alt ? slide.alt : 'image'}
                                             data-bgposition={slide.bgposition ? slide.bgposition : 'left center'}
                                             data-kenburns={slide.kenburns ? slide.kenburns : 'off'}
                                             data-duration={slide.duration ? slide.duration : 14000}
                                             data-ease={slide.ease ? slide.ease : 'Linear.easeNone'}
                                             data-bgfit={slide.bgfit ? slide.bgfit : 100}
                                             data-bgfitend={slide.bgfitend ? slide.bgfitend : 130}
                                             data-bgpositionend={slide.bgpositionend ? slide.bgpositionend : 'right center'}/>

                                        {slide.captions && slide.captions.map((caption, captionIndex) => {
                                            return (
                                                <div key={captionIndex}
                                                     className={'tp-caption ' + caption.classes}
                                                     data-x={caption.x}
                                                     data-y={caption.y}
                                                     data-hoffset={caption.hoffset}
                                                     data-voffset={caption.voffset}
                                                     data-speed={caption.speed}
                                                     data-start={caption.start}
                                                     data-splitin={caption.splitin}
                                                     data-splitout={caption.splitout}
                                                     data-elementdelay={caption.elementdelay}
                                                     data-endelementdelay={caption.endelementdelay}
                                                     data-easing={caption.easing}
                                                     data-endeasing={caption.endeasing}
                                                     data-endspeed={caption.endspeed}
                                                     data-captionhidden={caption.captionhidden}
                                                     data-customout={caption.customout}
                                                     style={caption.style}>
                                                    {caption.content}
                                                </div>
                                            )
                                        })}
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="tp-bannertimer"></div>
                    </div>
                </div>
            </div>
        );
    }
}