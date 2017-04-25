import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button} from 'react-bootstrap';

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
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
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
                <form action={actionUrl} method={method} onSubmit={handleSubmit}>
                    <Field
                        name="username"
                        type="text"
                        component={renderField}
                        label="Login"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={renderField}
                        label="Password"
                    />
                    {error && <strong>{error}</strong>}
                    <div>
                        <Button type="submit" disabled={submitting}>Войти</Button>
                    </div>
                </form>
            </div>
        );
    }
}
