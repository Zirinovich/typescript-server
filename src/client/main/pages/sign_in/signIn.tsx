import * as React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Button, Clearfix} from 'react-bootstrap';

import {i18n} from '../../../_common/tools/i18n/i18n';
import {Breadcrumbs} from '../../components/breadcrumbs/breadcrumbs';
import {SectionText} from '../../components/section_text/sectionText';
import {SignInForm} from './signInForm';

export class SignIn extends React.Component<any, any> {
    render() {
        const textSectionSubtitle = 'Точные телеком решения';
        return (
            <div>
                <SectionText subtitle={textSectionSubtitle}>
                    <LinkContainer to="/services">
                        <Button bsStyle="primary">Узнать больше</Button>
                    </LinkContainer>
                </SectionText>
                <Breadcrumbs title={i18n.t('main.authorizationPage')} params={this.props.params} routes={this.props.routes}/>
                <Clearfix/>
                <SignInForm/>
            </div>
        );
    }
}