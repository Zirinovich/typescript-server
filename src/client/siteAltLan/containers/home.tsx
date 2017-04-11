import * as React from 'react';

const style = require('./home.scss');
import {RevolutionSlider} from '../../common/components/revolutionSlider/revolutionSlider';

class Home extends React.Component<any, any> {
    public render() {
        return (
            <div className={style.Home}>
                <RevolutionSlider/>

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
