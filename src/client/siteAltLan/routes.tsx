import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {RouteProps} from '@types/react-router';

import {i18n} from '../../shared/tools/i18n/i18n';
import {App} from './pages/_app/app';
import {NotFound} from './pages/not_found/notFound';
import {Home} from './pages/home/home';
import {About} from './pages/about/about';
import {SignIn} from './pages/signin/signIn';
import {Contacts} from './pages/contacts/contacts';
import {Presentations} from './pages/presentations/presentations';
import {PresentationDetail} from './pages/presentation_detail/presentationDetail';

declare module 'react-router/lib/Route' {
    interface RouteProps {
        name?: any;
    }
}

export const routes = (
    <Route name={i18n.t('mainPage')} path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route name={i18n.t('authorizationPage')} path="login" component={SignIn}/>
        <Route path="contacts" component={Contacts}/>
        <Route name={i18n.t('presentationsPage')} path="presentations" component={Presentations}>
            <Route path=":id" component={PresentationDetail}/>
        </Route>
        <Route path="*" component={NotFound}/>
    </Route>
);