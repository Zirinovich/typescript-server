import * as React from 'react';
const style = require('./home.scss');

class Home extends React.Component<any, any> {
    public render() {
        return (
            <div className={style.Home}>
                <div className={style.logo}></div>
                <br/>
                <h1>Точные телеком решения</h1>
            </div>
        );
    }
}

export {Home}
