import * as React from 'react';

import {SignInForm} from '../components/signInForm';
import {signInRequest, signInSuccess} from '../redux/signInActions';

export class SignIn extends React.Component<any, any> {
    render() {
        return (
            <div>
                <SignInForm actionUrl="/login" method="POST" onSubmit={signInRequest} onSubmitSuccess={signInSuccess}/>
            </div>
        );
    }
}