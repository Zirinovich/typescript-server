import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

interface IProps {
    loadGoogleScript: (name: string, url: string, options?: any)=>void
    gkey: string;
}

export class ContactMap extends React.Component<IProps, any> {

    componentDidMount() { // исполняется только на клиенте, на сервере не вызывается
        let {loadGoogleScript, gkey} = this.props;
        loadGoogleScript("googleMap", "https://maps.googleapis.com/maps/api/js", {
            key: gkey,
            callback: "initMap",
            language: "ru-RU"
        });
        // функция initMap() Должна вызываться каждый раз когда включается вкладка
        const script = `\<script\>function initMap() {
        var uluru = {lat: 55.811360, lng: 37.625092};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });}\</script\>
        <style>.g-map {height:400px; width:500px;}</style>`;
        // let mapNode = ReactDOM.findDOMNode(this.refs["g-map"]);
        let node = ReactDOM.findDOMNode(this);
        $(node).append('\<h3\>My Google Maps Demo\</h3\>\<div class="g-map" id="map"  ref="g-map"/\>');
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