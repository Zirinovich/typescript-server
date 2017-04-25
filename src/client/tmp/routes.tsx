import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {Home} from './containers/home';
import {About} from './containers/about';
import {Counter} from './containers/counter';
import {Stars} from './containers/stars';
import {App} from './containers/app';
import {SignIn} from './containers/signIn';
import {Contacts} from './containers/contacts';
import {ServerRender} from './containers/serverRender';
import {ServerRender2} from './containers/serverRender2';

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="counter" component={Counter}/>
        <Route path="stars" component={Stars}/>
        <Route path="login" component={SignIn}/>
        <Route path="contacts" component={Contacts}/>
        <Route path="fetch/:fetchId" component={ServerRender2}/>
        <Route path="parallel" component={ServerRender}/>
    </Route>
);
