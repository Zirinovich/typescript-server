import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './googleMapContainer.scss';
import * as classNames from 'classnames';
// import * as $ from 'jquery';

interface IProps {
    googleAPIKey: string;
    options: any;
    className?: string;
    style?: any;
}

export class GoogleMapContainer extends React.Component<IProps, any> {

    constructor(props) {
        super(props);
        this.initMap = this.initMap.bind(this);

        this.refName = `gMapContainer-${(Math.floor(Math.random() * (1000 - 100)) + 100).toString()}`;
    }

    refName: string = this.refName;
    static googleMapAPIUrl: string = "https://maps.googleapis.com/maps/api/js";
    static isLoaded: boolean = false;

    static loadScript(url: string, key: string, options: any, callback: ()=>any) {
        if (GoogleMapContainer.isLoaded && callback) {
            callback();
            return;
        }
        let params = $.param(_.assign({key}, options));

        const script = document.createElement('script');
        script.src = `${url}?${params}`;
        script.async = true;
        script.onload = () => {
            GoogleMapContainer.isLoaded = true;
            callback();
        };
        document.head.appendChild(script);
    }

    initMap() {
        let uluru = {lat: 55.811360, lng: 37.625092};

        let map = new google.maps.Map(ReactDOM.findDOMNode(this.refs[this.refName]), {
            zoom: 18,
            center: uluru
        });
        new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    componentDidMount() { // исполняется только на клиенте, на сервере не вызывается
        let {googleAPIKey, options} = this.props;

        GoogleMapContainer.loadScript(GoogleMapContainer.googleMapAPIUrl, googleAPIKey, options, this.initMap);
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs[this.refName]));
    }

    public render() {
        const {className, style} = this.props;
        return (<div style={{...style}} ref={this.refName}
                     className={classNames("g-map-container", className)}/>);
    }
}