import * as React from 'react';

const style = require('./home.scss');
import {Slider} from '../components/slider';

class Home extends React.Component<any, any> {
    public render() {
        return (
            <div className={style.Home}>
                <Slider/>
                <h1>Точные телеком решения</h1>
            </div>
        );
    }
}

export {Home}
