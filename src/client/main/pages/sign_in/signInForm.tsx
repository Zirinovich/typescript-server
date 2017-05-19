import * as React from 'react';
const {connect} = require('react-redux');
import {Grid, Row, Col, Button} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {IconInput} from '../../components/icon_input/iconInput';
import {EventArgsDto} from "../../../_common/interfaces/EventArgsDto";
import {EventMethodEnum} from "../../../_common/interfaces/EventMethodEnum";
import {signInRequest} from '../../redux/signInActions';

const style = require('./signInForm.scss');

interface IProps {
    signInRequest?: any;
}

@connect(
    (state) => ({}),
    (dispatch) => ({
        signInRequest: (credentials) => dispatch(signInRequest(credentials))
    })
)
export class SignInForm extends React.Component<IProps, any> {
    constructor(props) {
        super(props);

        this.onEventHandler = this.onEventHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    onEventHandler(args: EventArgsDto) {
        if (args.event == EventMethodEnum.OnChange) {
            let state = {};
            state[args.name] = args.value;
            this.setState(state);
        }
    }

    submitHandler(e) {
        e.preventDefault();
        const {signInRequest} = this.props;
        signInRequest(this.state);
    }

    public render() {
        return (
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
                                            <IconInput name="login"
                                                       iconName="user"
                                                       required
                                                       onEvent={this.onEventHandler}/>
                                        </Col>
                                    </Row>
                                </section>

                                <section>
                                    <Row>
                                        <Col md={4}>
                                            <label>{i18n.t('main.password')}</label>
                                        </Col>
                                        <Col md={8}>
                                            <IconInput name="password"
                                                       type="password"
                                                       iconName="lock"
                                                       required
                                                       onEvent={this.onEventHandler}/>
                                            <div className={style.note}>
                                                <a href="#sky-form2"
                                                   className="modal-opener">{i18n.t('main.forgotPassword')}</a>
                                            </div>
                                        </Col>
                                    </Row>
                                </section>
                            </fieldset>

                            <footer>
                                <Button type="submit"
                                        bsStyle="primary">{i18n.t('main.actionLogin')}</Button>
                            </footer>
                        </form>
                    </div>
                </Grid>
            </div>
        );
    }
}
