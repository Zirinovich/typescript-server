import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {RouteProps} from '@types/react-router';

import {i18n} from '../_common/tools/i18n/i18n';
import {routes as administrationRoutes} from '../administration/routes';
import {App} from './pages/_app/app';
import {Contacts} from './pages/contacts/contacts';
import {Home} from './pages/home/home';
import {NotFound} from './pages/not_found/notFound';
import {Partners} from './pages/partners/partners';
import {PresentationDetail} from './pages/presentation_detail/presentationDetail';
import {Presentations} from './pages/presentations/presentations';
import {Services} from './pages/services/services';
import {SignIn} from './pages/sign_in/signIn';
import {Solutions} from './pages/solutions/solutions';

declare module 'react-router/lib/Route' {
    interface RouteProps {
        name?: any;
    }
}

export function routes (store) {
    return (
        <Route name={i18n.t('main.mainPage')} path="/" component={App}>
            <IndexRoute component={Home}/>
            {administrationRoutes(store)}
            <Route name={i18n.t('main.authorizationPage')} path="login" component={SignIn}/>
            <Route name={i18n.t('main.contactsPage')} path="contacts" component={Contacts}/>
            <Route name={i18n.t('main.servicesPage')} path="services" component={Services}/>
            <Route name={i18n.t('main.solutionsPage')} path="solutions" component={Solutions}/>
            <Route name={i18n.t('main.partnersPage')} path="partners" component={Partners}/>
            <Route name={i18n.t('main.presentationsPage')} path="presentations" component={Presentations}>
                <Route path=":id" component={PresentationDetail}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Route>
    )
}