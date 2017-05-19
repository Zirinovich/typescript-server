import * as React from 'react';
import * as Helmet from 'react-helmet';
import * as fs from "fs";
const {connect} = require('react-redux');

import {i18n} from './tools/i18n/i18n';
const i18nResources = require('./i18n.json');

interface IHtmlProps {
    manifest?: any;
    markup?: string;
    store?: any;
    setResources?: any;
}

@connect(
    (state) => ({}),
    (dispatch) => ({
        setResources: (resources, key) => dispatch(i18n.setResources(resources, key))
    })
)
class Html extends React.Component<IHtmlProps, {}> {
    static extractTextPluginStyleBundles = fs.readdirSync('./build/public/css').filter(o => /\.css$/.test(o)).map(file => '/public/css/' + file);

    private resolve(files) {
        return files.map((src) => {
            if (!this.props.manifest[src]) {
                return;
            }
            return '/public/' + this.props.manifest[src];
        }).filter((file) => file !== undefined);
    }

    componentWillMount() {
        const {setResources} = this.props;
        setResources('_common', i18nResources);
    }

    public render() {
        const head = Helmet.rewind();
        const {markup, store} = this.props;

        const styles = this.resolve(['vendor.css', 'app.css']);
        const renderStyles = styles.concat(Html.extractTextPluginStyleBundles).map((src, i) =>
            <link key={i} rel="stylesheet" type="text/css" href={src}/>,
        );

        const scripts = this.resolve(['vendor.js', 'app.js']);
        const renderScripts = scripts.map((src, i) =>
            <script src={src} key={i}/>,
        );

        // tslint:disable-next-line:max-line-length
        const initialState = (<script
            dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};` }}
            charSet="UTF-8"/>);

        return (
            <html>
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}

                {renderStyles}
                <link rel="shortcut icon" href="/favicon.ico"/>
            </head>
            <body>
            <main id="app" dangerouslySetInnerHTML={{ __html: markup }}/>

            {initialState}
            {renderScripts}
            </body>
            </html>
        );
    }
}

export {Html}
