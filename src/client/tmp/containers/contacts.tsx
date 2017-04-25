import * as React from 'react';
import {GoogleMapContainer} from '../../common/components/googleMapContainer/googleMapContainer';

export class Contacts extends React.Component<any, any> {

    public render() {
        return (
            <div>
                <GoogleMapContainer
                    googleAPIKey="AIzaSyBZKRzL-MKcBjVPbkcpXaSI_nhhbx1rkCY"
                    options={{language:"ru-RU"}}
                    className="super-google-map"
                    style={{height:"700px",width:"100%", border:"1px black solid"}}
                />
            </div>
        );
    }
}