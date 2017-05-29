import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {RouteProps} from '@types/react-router';

import {App} from './pages/_app/app';
import {Main} from './pages/main/main';
import {ContentPage} from './pages/content/contentPage';
import {FilesPage} from './pages/files/filesPage';
import {UsersPage} from './pages/users/usersPage';
import {RolesPage} from './pages/roles/rolesPage';

declare module 'react-router/lib/Route' {
    interface RouteProps {
        name?: any;
    }
}

let store;

function requirePermission(nextState, transition, cb) {
    const state = store.getState();
    if(!state || !state.session){
        transition('/');
    }
    cb();
}

export function routes(storeRef) {
    store = storeRef;
    return (
        <Route path="admin" component={App} onEnter={requirePermission}>
            <IndexRoute component={Main}/>
            <Route path="content" component={ContentPage}/>
            <Route path="files" component={FilesPage}/>
            <Route path="users" component={UsersPage}/>
            <Route path="roles" component={RolesPage}/>
        </Route>
    )
}
