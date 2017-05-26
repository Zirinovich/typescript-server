import * as React from 'react';

const style = require('./itemHover.scss');

interface IProps {
    title: string;
    text?: string;
    element?: JSX.Element;
}

interface IState {

}

class ItemHover extends React.Component<IProps, IState> {
    render() {
        const {children, title, text, element} = this.props;
        return (
            <div className={style.hover}>
                <div className={style.wrapper}>
                    <div className={style.image_box}>
                        {children}
                    </div>
                    <div className={style.text}>
                        <h3>{title}</h3>
                        <p>{text}</p>
                        {element}
                    </div>
                </div>
            </div>
        )
    }
}

export {ItemHover};