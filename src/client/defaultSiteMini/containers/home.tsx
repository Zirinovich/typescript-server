import * as React from 'react';
const style = require('./home.scss');

class Home extends React.Component<any, any> {
    public render() {
        return (
            <div className={style.Home}>
                <div className={style.logo}></div>
                <br/>
                <p>Hello!</p>
            </div>
        );
    }
}

export {Home}
