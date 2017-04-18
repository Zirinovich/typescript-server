import * as React from 'react';
import {reduxForm} from 'redux-form';
const {connect} = require('react-redux');
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';

import {GoogleMapContainer} from '../../../common/components/googleMapContainer/googleMapContainer';
import {i18n} from '../../../../shared/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {TextSection} from '../../components/text_section/textSection';
import {IconInput} from '../../components/icon_input/iconInput';
import {IconTextarea} from '../../components/icon_textarea/iconTextarea';
const style = require('./contacts.scss');

@connect(
    (state) => ({
        currentLanguage: state.i18n.currentLanguage
    })
)
@reduxForm({
    form: 'feedback'
})
export class Contacts extends React.Component<any, any> {
    public render() {
        const {currentLanguage} = this.props;
        const textSectionSubtitle = 'Точные телеком решения';
        return (
            <div>
                <TextSection subtitle={textSectionSubtitle} button={<Button bsStyle="primary">Узнать больше</Button>}/>
                <Breadcrumbs title={i18n.t('contactsPage')} params={this.props.params} routes={this.props.routes}/>

                <div className={style.section}>
                    <Grid>
                        <Col md={8}>
                            <div className={style.map_wrapper}>
                                <GoogleMapContainer
                                    googleAPIKey='AIzaSyBZKRzL-MKcBjVPbkcpXaSI_nhhbx1rkCY'
                                    options={{language:currentLanguage}}
                                    className={style.map}
                                />
                            </div>

                            <form>
                                <h2 className={style.title}>
                                    {i18n.t('sendUsMessage')}
                                </h2>
                                <fieldset>
                                    <Row>
                                        <Col md={6}>
                                            <label className="label">Name</label>
                                            <IconInput name="name" iconName="user"/>
                                        </Col>
                                        <Col md={6}>
                                            <label className="label">E-mail</label>
                                            <IconInput name="email" iconName="envelope"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <label className="label">Subject</label>
                                            <IconInput name="subject" iconName="tag"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <label className="label">Message</label>
                                            <IconTextarea name="message" iconName="comment"/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <label className="checkbox">
                                                <Checkbox/>
                                                <i></i>Send a copy to my e-mail address</label>
                                        </Col>
                                    </Row>
                                </fieldset>
                                <footer>
                                    <Button type="submit" bsStyle="primary">{i18n.t('actionSend')}</Button>
                                </footer>
                                <div className="message"><i className="icon-ok"></i>
                                    <p>Your message was successfully sent!</p>
                                </div>
                            </form>
                        </Col>

                        <Col md={4}>
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
                        </Col>
                    </Grid>
                </div>
            </div>
        );
    }
}