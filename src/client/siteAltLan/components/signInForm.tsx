import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
//import {Button} from 'react-bootstrap';

interface IProps {
    handleSubmit?: any, //EventHandler<FormEvent<HTMLFormElement>>,
    submitting?: any,
    method: string,
    actionUrl: string,
    error?: any,
    onSubmit?: any,
    onSubmitSuccess?: any
}

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && error && <span>{error}</span>}
    </div>
);

@reduxForm({
    form: 'signIn'
})
export class SignInForm extends React.Component<IProps, any> {
    public render() {
        const {handleSubmit, submitting, method, actionUrl, error} = this.props;
        return (
            <div>
                <div className="clearfix"></div>
                <div className="header_medium two">
                    <div className="container">
                        <h3 className="bigtext"> We are <span>Foxuhost.</span></h3>
                        <h3 className="smalltext"><span>Get 7+</span> Unique Layouts</h3>
                    </div>
                </div>

                <div className="section_holder18">
                    <div className="container">
                        <div className="pagetitle">
                            <h3>Login form</h3>
                        </div>
                        <div className="pagenation">&nbsp;<a href="index.html">Home</a> <i>/</i> <a href="#">Pages</a>
                            <i>/</i> Login form
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>

                <div className="section_holder27">
                    <div className="container">
                        <div className="login_form">
                            <form id="sky-form" className="sky-form" action={actionUrl} method={method}
                                  onSubmit={handleSubmit}>
                                <header>Login form</header>

                                <fieldset>
                                    <section>
                                        <div className="row">
                                            <label className="label col col-4">Login</label>
                                            <div className="col col-8">
                                                <label className="input">
                                                    <i className="icon-append icon-user"></i>
                                                    <Field
                                                        name="username"
                                                        type="text"
                                                        component={renderField}
                                                        label="Login"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div className="row">
                                            <label className="label col col-4">Password</label>
                                            <div className="col col-8">
                                                <label className="input">
                                                    <i className="icon-append icon-lock"></i>
                                                    <Field
                                                        name="password"
                                                        type="password"
                                                        component={renderField}
                                                        label="Password"
                                                    />
                                                </label>
                                                <div className="note"><a href="#sky-form2" className="modal-opener">Forgot password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <div className="row">
                                            <div className="col col-4"></div>
                                            <div className="col col-8">
                                                <label className="checkbox"><input type="checkbox" name="remember"
                                                                                   checked/><i></i>Keep me logged in</label>
                                            </div>
                                        </div>
                                        {error && <strong>{error}</strong>}
                                    </section>


                                </fieldset>
                                <footer>
                                    <div className="fright">
                                        <button type="submit" className="button eight" disabled={submitting}>Log in
                                        </button>
                                    </div>

                                </footer>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}
