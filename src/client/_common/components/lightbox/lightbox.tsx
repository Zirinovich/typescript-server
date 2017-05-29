import * as React from 'react';

interface IProps {
    src: string;
    id: string;
    title?: any;
    className?: string;
}

interface IState {

}

class Lightbox extends React.Component<IProps, IState> {
    static isLoaded = false;

    static loadJsClient() {
        if (!Lightbox.isLoaded) {
            require('lightbox2');
            require('lightbox2/src/css/lightbox.css');
            Lightbox.isLoaded = true;
        }
    }

    componentDidMount() {
        Lightbox.loadJsClient();
    }

    render() {
        const {src, id, title, className, children} = this.props;
        return (
            <a href={src}
               data-lightbox={id}
               data-title={title}
               className={className}>{children}</a>
        )
    }
}

export {Lightbox};