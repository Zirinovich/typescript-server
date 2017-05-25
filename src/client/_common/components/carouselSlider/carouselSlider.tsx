import * as React from 'react';
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick-theme.css');

const style = require('./carouselSlider.scss');

//#region interfaces
interface IProps {
    items: JSX.Element[]
}

interface IState {

}
//#endregion

class CarouselSlider extends React.Component<IProps, IState> {
    static isLoaded = false;

    static loadJsClient() {
        if (!CarouselSlider.isLoaded) {
            require('slick-carousel');
            CarouselSlider.isLoaded = true;
        }
    }

    componentDidMount() {
        CarouselSlider.loadJsClient();
        $('.' + style.slider).slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4
        });
    }

    render() {
        const {items} = this.props;
        return (
            <div className={style.slider}>
                {
                    items.map((item, index) => {
                        return(
                            <div key={index}>{item}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export {CarouselSlider};