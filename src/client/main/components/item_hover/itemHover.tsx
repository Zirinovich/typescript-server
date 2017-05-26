import * as React from 'react';

const style = require('./itemHover.scss');

interface IProps {
    title: string;
    text?: string;
}

interface IState {

}

class ItemHover extends React.Component<IProps, IState> {
    render() {
        const {children, title, text} = this.props;
        return (
            <div className={style.img_ho_st_holder}>
                <div className={style.img_ho_st3}>
                    <div className={style.imgbox}>
                        {children}
                    </div>
                    <div className={style.text}>
                        <h3>{title}</h3>
                        <p>{text}</p>
                        <a href="#" className={style.readmore_small}>Лицензия</a>
                    </div>
                </div>
            </div>
        )
    }
}

export {ItemHover};