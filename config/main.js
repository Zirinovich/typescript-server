/** General Configurations Like PORT, HOST names and etc... */

var config = {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8889,
    karmaPort: 9876,
    APP_ENTRY: 'siteAltLan',

    // This part goes to React-Helmet for Head of our HTML
    app: {
        head: {
            title: 'isomorphic',
            titleTemplate: 'Платформа: %s',
            meta: [
                {charset: 'utf-8'},
                {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'description', content: 'React Redux Typescript'},
            ]
        }
    }
};

module.exports = config;
