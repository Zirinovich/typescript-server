import * as React from 'react';
import {IndexRoute, Route} from 'react-router';

import {App} from './pages/_app/app';
import {NotFound} from './pages/not_found/notFound';
import {Home} from './pages/home/home';
import {About} from './pages/about/about';
import {SignIn} from './pages/signin/signIn';
import {Contacts} from './pages/contacts/contacts';
import {Presentations} from './pages/presentations/presentations';
import {PresentationDetail} from './pages/presentation_detail/presentationDetail';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="login" component={SignIn}/>
        <Route path="contacts" component={Contacts}/>
        <Route path="presentations" component={Presentations}/>
        <Route path="presentations/:id" component={PresentationDetail}/>
        <Route path="*" component={NotFound}/>
    </Route>
);