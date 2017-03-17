import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

interface IProps {
    loadGoogleScript: (name: string, url: string, options?: any)=>void
}

export class ContactMap extends React.Component<IProps, any> {

    componentDidMount() {
        const script = `\<script\>function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });\</script\>`;
        // let mapNode = ReactDOM.findDOMNode(this.refs["g-map"]);
        let node = ReactDOM.findDOMNode(this);
        $(node).append('\<h3\>My Google Maps Demo\</h3\>\<div id="map" ref="g-map"/\>');
        $(node).append(script);


    }

    public render() {
        return (
            <div/>

                /*<h3>My Google Maps Demo</h3>
                <div id="map" ref="g-map"/>
            </div>*/
        );
    }
}