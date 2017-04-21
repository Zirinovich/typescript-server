import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {RouteProps} from '@types/react-router';

import {App} from './pages/_app/app';
import {Main} from './pages/main/main';
import {Editor} from './pages/editor/editor';

declare module 'react-router/lib/Route' {
    interface RouteProps {
        name?: any;
    }
}

export const routes = (
    <Route path="admin" component={App}>
        <IndexRoute component={Main}/>
        <Route path="editor" component={Editor}/>
    </Route>
);

