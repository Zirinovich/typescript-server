import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../../../shared/tools/i18n/i18n';
import {Icon} from '../../../common/components/icon/icon';

const style = require('./signInForm.scss');

interface IProps {
    handleSubmit?: any, //EventHandler<FormEvent<HTMLFormElement>>,
    submitting?: any,
    method: string,
    actionUrl: string,
    error?: any,
    onSubmit?: any,
    onSubmitSuccess?: any
}

@reduxForm({
    form: 'signIn'
})
export class SignInForm extends React.Component<IProps, any> {
    renderField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && error && <span>{error}</span>}
            </div>
        )
    }

    public render() {
        const {handleSubmit, submitting, method, actionUrl, error} = this.props;
        return (
            <div>
                <div className={style.section}>
                    <Grid>
                        <div className={style.login_form}>
                            <form action={actionUrl}
                                  method={method}
                                  onSubmit={handleSubmit}>
                                <header>{i18n.t('loginForm')}</header>

                                <fieldset>
                                    <section>
                                        <Row>
                                            <Col md={4}>
                                                <label>{i18n.t('login')}</label>
                                            </Col>
                                            <Col md={8}>
                                                <label className={style.input}>
                                                    <Icon name="user"/>
                                                    <Field
                                                        name="username"
                                                        type="text"
                                                        component={this.renderField}
                                                    />
                                                </label>
                                            </Col>
                                        </Row>
                                    </section>

                                    <section>
                                        <Row>
                                            <Col md={4}>
                                                <label>{i18n.t('password')}</label>
                                            </Col>
                                            <Col md={8}>
                                                <label className={style.input}>
                                                    <Icon name="lock"/>
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        component={this.renderField}
                                                    />
                                                </label>
                                                <div className={style.note}>
                                                    <a href="#sky-form2"
                                                       className="modal-opener">{i18n.t('forgotPassword')}</a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </section>

                                    {error && <section>
                                        <Row>
                                            <Col md={12}>
                                                <strong>{error}</strong>
                                            </Col>
                                        </Row>
                                    </section>}
                                </fieldset>

                                <footer>
                                    <Button type="submit"
                                            bsStyle="primary"
                                            disabled={submitting}>{i18n.t('actionLogin')}</Button>
                                </footer>
                            </form>
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
}
