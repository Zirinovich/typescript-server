import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import {App} from '../containers/app';
import {Home} from '../containers/home';
import {About} from '../containers/about';
import {Counter} from '../containers/counter';
import {Stars} from '../containers/stars';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="about" component={About}/>
        <Route path="counter" component={Counter}/>
        <Route path="stars" component={Stars}/>
    </Route>
);
