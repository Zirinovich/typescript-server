import * as React from 'react';
import {Button} from 'react-bootstrap';

import {i18n} from '../../../../shared/tools/i18n/i18n';
import {signInRequest, signInSuccess} from '../../redux/signInActions';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {TextSection} from '../../components/text_section/textSection';
import {SignInForm} from './signInForm';

export class SignIn extends React.Component<any, any> {
    render() {
        const textSectionSubtitle = 'Точные телеком решения';
        return (
            <div>
                <TextSection subtitle={textSectionSubtitle} button={<Button bsStyle="primary">Узнать больше</Button>}/>
                <Breadcrumbs title={i18n.t('authorizationPage')} params={this.props.params} routes={this.props.routes}/>
                <SignInForm actionUrl="/login"
                            method="POST"
                            onSubmit={signInRequest}
                            onSubmitSuccess={signInSuccess}/>
            </div>
        );
    }
}