import * as React from 'react';
const {connect} = require('react-redux');
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {IconInput} from '../../components/icon_input/iconInput';
import {Input} from "../../../_common/components/input/input";
import {EventArgsDto} from "../../../_common/interfaces/EventArgsDto";
import {EventMethodEnum} from "../../../_common/interfaces/EventMethodEnum";
import {signInRequest, signInSuccess} from '../../redux/signInActions';

const style = require('./signInForm.scss');

interface IProps {
    handleSubmit?: any, //EventHandler<FormEvent<HTMLFormElement>>,
    submitting?: any,
    method: string,
    actionUrl: string,
    error?: any,
    onSubmit?: any,
    onSubmitSuccess?: any
    signInRequest?: any;
}

@connect(
    (state) => ({}),
    (dispatch) => ({
        signInRequest: (role) => dispatch(signInRequest(role))
    })
)
export class SignInForm extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    fieldChangeHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        const {signInRequest} =this.props;
        console.log(this.state);
        signInRequest(this.state);
        e.preventDefault();
    }

    public render() {
        const {handleSubmit, submitting, method, actionUrl, error} = this.props;
        return (
            <div>
                <div className={style.section}>
                    <Grid>
                        <div className={style.login_form}>
                            <form onSubmit={this.submitHandler}>
                                <header>{i18n.t('main.loginForm')}</header>

                                <fieldset>
                                    <section>
                                        <Row>
                                            <Col md={4}>
                                                <label>{i18n.t('main.login')}</label>
                                            </Col>
                                            <Col md={8}>
                                                <Input name="login"
                                                       onEvent={this.fieldChangeHandler}/>
                                            </Col>
                                        </Row>
                                    </section>

                                    <section>
                                        <Row>
                                            <Col md={4}>
                                                <label>{i18n.t('main.password')}</label>
                                            </Col>
                                            <Col md={8}>
                                                <Input name="password"
                                                       type="password"
                                                       onEvent={this.fieldChangeHandler}/>
                                                <div className={style.note}>
                                                    <a href="#sky-form2"
                                                       className="modal-opener">{i18n.t('main.forgotPassword')}</a>
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
                                            disabled={submitting}>{i18n.t('main.actionLogin')}</Button>
                                </footer>
                            </form>
                        </div>
                    </Grid>
                </div>
            </div>
        );
    }
}
