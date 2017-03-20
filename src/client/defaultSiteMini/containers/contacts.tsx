import * as React from 'react';

import {loadScript} from '../../common/redux/loadScriptActions';
import {GoogleMapContainer} from '../../common/components/googleMapContainer/googleMapContainer';
const {connect} = require('react-redux');

@connect(
    (state) => ({counter: state.counter}),
    (dispatch) => ({
        scriptLoad: (name: string, url: string, options?: any) => dispatch(loadScript(name, url, options))
    }),
)
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