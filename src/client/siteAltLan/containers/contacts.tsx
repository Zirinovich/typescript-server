import * as React from 'react';
//import {GoogleMapContainer} from '../../common/components/googleMapContainer/googleMapContainer';

export class Contacts extends React.Component<any, any> {

    public render() {
        return (
            <div>
                <div className="clearfix"></div>
                <div className="header_medium two">
                    <div className="container">
                        <h3 className="bigtext"> Contact <span>Us</span></h3>
                        <h3 className="smalltext"><span>Get 7+</span> Unique Layouts</h3>
                    </div>
                </div>

                <div className="section_holder18">
                    <div className="container">
                        <div className="pagetitle">
                            <h3>Contact Style Two</h3>
                        </div>
                        <div className="pagenation">&nbsp;<a href="index.html">Home</a> <i>/</i> Contact Style Two</div>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="section_holder30">
                    <div className="container">
                        <div className="two_third">

                            <div className="one_full">
                                <iframe className="google-map"
                                        src="https://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Washington,+DC,+United+States&amp;aq=2&amp;oq=was&amp;sll=40.714353,-74.005973&amp;sspn=0.765069,1.674042&amp;ie=UTF8&amp;hq=&amp;hnear=Washington,+District+of+Columbia&amp;t=m&amp;z=11&amp;ll=38.907231,-77.036464&amp;output=embed"></iframe>
                                <div className="bottom_strip"></div>
                                <div className="bottom_shape two"></div>
                                <br />

                                <small><a
                                    href="https://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=Washington,+DC,+United+States&amp;aq=2&amp;oq=was&amp;sll=40.714353,-74.005973&amp;sspn=0.765069,1.674042&amp;ie=UTF8&amp;hq=&amp;hnear=Washington,+District+of+Columbia&amp;t=m&amp;z=11&amp;ll=38.907231,-77.036464"
                                    style={{'color':'#0000FF','textAlign':'left'}}>View Larger Map</a></small>
                            </div>

                            <br /><br />

                            <form action="demo-contacts.php" method="post" id="sky-form" className="sky-form">
                                <h2 className="uppercase"><strong>send us a message</strong></h2>
                                <fieldset>
                                    <div className="row">
                                        <section className="col col-6">
                                            <label className="label">Name</label>
                                            <label className="input"> <i className="icon-append icon-user"></i>
                                                <input type="text" name="name" id="name"/>
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                            <label className="label">E-mail</label>
                                            <label className="input"> <i className="icon-append icon-envelope-alt"></i>
                                                <input type="email" name="email" id="email"/>
                                            </label>
                                        </section>
                                    </div>
                                    <section>
                                        <label className="label">Subject</label>
                                        <label className="input"> <i className="icon-append icon-tag"></i>
                                            <input type="text" name="subject" id="subject"/>
                                        </label>
                                    </section>
                                    <section>
                                        <label className="label">Message</label>
                                        <label className="textarea"> <i className="icon-append icon-comment"></i>
                                            <textarea rows={4} name="message" id="message"></textarea>
                                        </label>
                                    </section>
                                    <section>
                                        <label className="checkbox">
                                            <input type="checkbox" name="copy" id="copy"/>
                                            <i></i>Send a copy to my e-mail address</label>
                                    </section>
                                </fieldset>
                                <footer>
                                    <button type="submit" className="button">Send message</button>
                                </footer>
                                <div className="message"><i className="icon-ok"></i>
                                    <p>Your message was successfully sent!</p>
                                </div>
                            </form>
                        </div>

                        <div className="one_third last">

                            <div className="address_info two">

                                <h4 className="uppercase"><strong>Address Info</strong></h4>
                                <p>
                                    Feel free to talk to our online representative at any time you please using our Live Chat system on our website or one of the below instant messaging programs.</p>
                                <br />
                                <p>Please be patient while waiting for response. (24/7 Support!) <strong>Phone General Inquiries: 1-888-123-4567-8900</strong>
                                </p>
                                <br />


                            </div>

                            <div className="address_info two">

                                <h4 className="uppercase"><strong>Address Info Two</strong></h4>
                                <ul>
                                    <li><h5>Company Name</h5>
                                        2901 Marmora Road, Glassgow, Seattle, WA 98122-1090<br />
                                        Telephone: +1 1234-567-89000<br />
                                        FAX: +1 0123-4567-8900<br />
                                        E-mail: <a href="mailto:mail@companyname.com">mail@companyname.com</a><br />
                                        Website: <a href="index.html">www.yoursitename.com</a></li>
                                </ul>

                            </div>

                        </div>

                    </div >

                </div>
            </div>
        );
    }
}