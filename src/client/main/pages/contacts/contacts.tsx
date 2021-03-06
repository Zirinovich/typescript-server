import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Grid, Row, Col, Button, Checkbox} from 'react-bootstrap';
import {Link} from 'react-router';
const {connect} = require('react-redux');

import {GoogleMapContainer} from '../../../_common/components/googleMapContainer/googleMapContainer';
import {i18n} from '../../../_common/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
import {IconInput} from '../../components/icon_input/iconInput';
import {IconTextarea} from '../../components/icon_textarea/iconTextarea';
const style = require('./contacts.scss');

interface IProps {
    currentLanguage?: string;
    params?: any;
    routes?: any;
}

interface IState {

}

@connect(
    (state) => ({
        currentLanguage: state.i18n.currentLanguage
    })
)
export class Contacts extends React.Component<IProps, IState> {
    public render() {
        const {currentLanguage, params, routes} = this.props;
        const textSectionSubtitle = 'Точные телеком решения';

        const company = {
            name: 'Группа компаний ALT-LAN',
            phone: '+7(499)641-02-86',
            address: 'Звездный б-р, 21, Москва, Россия, 129085',
            email: 'info@alt-lan.ru',
            website: 'www.alt-lan.ru'
        };
        return (
            <div>
                <SectionText subtitle={textSectionSubtitle}>
                    <LinkContainer to="/services">
                        <Button bsStyle="primary">Узнать больше</Button>
                    </LinkContainer>
                </SectionText>
                <Breadcrumbs title={i18n.t('main.contactsPage')} params={params} routes={routes}/>

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
                                    {i18n.t('main.sendUsMessage')}
                                </h2>
                                <fieldset>
                                    <section>
                                        <Row>
                                            <Col md={6}>
                                                <label className={style.label}>{i18n.t('main.username')}</label>
                                                <IconInput name="name" iconName="user"/>
                                            </Col>
                                            <Col md={6}>
                                                <label className={style.label}>{i18n.t('main.email')}</label>
                                                <IconInput name="email" iconName="envelope"/>
                                            </Col>
                                        </Row>
                                    </section>

                                    <section>
                                        <Row>
                                            <Col md={12}>
                                                <label className={style.label}>{i18n.t('main.subject')}</label>
                                                <IconInput name="subject" iconName="tag"/>
                                            </Col>
                                        </Row>
                                    </section>

                                    <section>
                                        <Row>
                                            <Col md={12}>
                                                <label className={style.label}>{i18n.t('main.message')}</label>
                                                <IconTextarea name="message" iconName="comment"/>
                                            </Col>
                                        </Row>
                                    </section>

                                    <section>
                                        <Row>
                                            <Col md={12}>
                                                <label className="checkbox">
                                                    <Checkbox inline={true}/>
                                                    {i18n.t('main.sendCopyToMyEmailAddress')}</label>
                                            </Col>
                                        </Row>
                                    </section>
                                </fieldset>
                                <footer>
                                    <Button type="submit" bsStyle="primary">{i18n.t('main.actionSend')}</Button>
                                </footer>
                            </form>
                        </Col>

                        <Col md={4}>
                            <div className={style.info}>
                                <h4 className={style.title}>{i18n.t('main.phoneNumberForCommunications')}</h4>
                                <p>{i18n.t('main.reception')} <strong>{company.phone}</strong></p>
                            </div>

                            <div className={style.info}>
                                <h4 className={style.title}>{i18n.t('main.addressInfo')}</h4>
                                <ul>
                                    <li>
                                        <h5>{company.name}</h5>
                                        {company.address}<br/>
                                        {i18n.t('main.email')}: <a href={company.email}>{company.email}</a><br/>
                                        {i18n.t('main.website')}: <Link to="/">{company.website}</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Grid>
                </div>
            </div>
        );
    }
}