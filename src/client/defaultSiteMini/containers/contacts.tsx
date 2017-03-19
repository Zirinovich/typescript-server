import * as React from 'react';
import {ContactMap} from '../components/contactMap';
import {loadScript} from '../../common/redux/loadScriptActions';
const {connect} = require('react-redux');

@connect(
    (state) => ({counter: state.counter}),
    (dispatch) => ({
        scriptLoad: (name: string, url: string, options?: any) => dispatch(loadScript(name, url, options))
    }),
)
export class Contacts extends React.Component<any, any> {

    public render() {
        const {scriptLoad} = this.props;
        return (
            <div>
                <ContactMap loadGoogleScript={scriptLoad} gkey="AIzaSyBZKRzL-MKcBjVPbkcpXaSI_nhhbx1rkCY"/>
            </div>
        );
    }
}