import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {RouteProps} from '@types/react-router';

import {App} from './pages/_app/app';
import {Main} from './pages/main/main';
import {ContentPage} from './pages/content/contentPage';
import {UsersPage} from './pages/users/usersPage';
import {RolesPage} from './pages/roles/rolesPage';

declare module 'react-router/lib/Route' {
    interface RouteProps {
        name?: any;
    }
}

export const routes = (
    <Route path="admin" component={App}>
        <IndexRoute component={Main}/>
        <Route path="content" component={ContentPage}/>
        <Route path="users" component={UsersPage}/>
        <Route path="roles" component={RolesPage}/>
    </Route>
);

