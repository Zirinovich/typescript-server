import * as React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface IProps {
    images: {
        original: string;
        thumbnail: string;
    }[];
}

interface IState {

}

export class Gallery extends React.Component<IProps, IState> {
    handleImageLoad(event) {
        // console.log('Image loaded ', event.target)
    }

    render() {
        const {images} = this.props;
        return (
            <ImageGallery
                items={images}
                slideInterval={2000}
                onImageLoad={this.handleImageLoad}/>
        );
    }
}