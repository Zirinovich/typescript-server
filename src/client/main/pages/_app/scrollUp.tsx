import * as React from 'react';

import {Icon} from '../../../_common/components/icon/icon';
const style = require('./scrollUp.scss');

interface IProps {

}

interface IState {

}

export class ScrollUp extends React.Component<IProps, IState> {
    componentDidMount() {
        let $scroll = $('.' + style.scroll);
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $scroll.fadeIn();
            } else {
                $scroll.fadeOut();
            }
        });

        $scroll.click(function () {
            $('html, body').animate({scrollTop: 0}, 500);
            return false;
        });
    }

    render() {
        return (
            <a className={style.scroll}>
                <Icon name="angle-up"/>
            </a>
        )
    }
}