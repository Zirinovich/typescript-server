import * as React from 'react';
const style = require('./slider.scss');

class Slider extends React.Component<any, any> {
    public render() {
        return (
            <div className={style.Slider}>
                <img src={require('./content/slider.png')}/>
            </div>
        );
    }
}

export {Slider}
