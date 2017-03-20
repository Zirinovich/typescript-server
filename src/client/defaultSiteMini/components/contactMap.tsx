import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import * as $ from 'jquery';

interface IProps {
    loadGoogleScript: (name: string, url: string, options?: any)=>void
    gkey: string;
}

export class ContactMap extends React.Component<IProps, any> {

    componentDidMount() { // исполняется только на клиенте, на сервере не вызывается
        let {gkey} = this.props;
        $("head").append(`<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${gkey}">`);
        let uluru = {lat: 55.811360, lng: 37.625092};
        setTimeout(()=>{
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 18,
                center: uluru
            });
            new google.maps.Marker({
                position: uluru,
                map: map
            });

        },3000);
/*
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
        <style>.gmap {height:400px; width:500px;}</style>`;
        // let mapNode = ReactDOM.findDOMNode(this.refs["g-map"]);
        let node = ReactDOM.findDOMNode(this);
        $(node).append('\<h3\>My Google Maps Demo\</h3\>\<div class="g-map" id="map"  ref="g-map"/\>');
        $(node).append(script);
*/
    }

    public render() {
        return (

            <div style={{height:"400px", width:"500px"}} id="map" className="gmap"/>

            /*<h3>My Google Maps Demo</h3>
             <div id="map" ref="g-map"/>
             </div>*/
        );
    }
}