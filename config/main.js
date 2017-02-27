var config = {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,

    // This part goes to React-Helmet for Head of our HTML
    app: {
        head: {
            title: 'webpack-hot-middleware',
            titleTemplate: 'webpack-hot-middleware: %s',
            meta: [
                { charset: 'utf-8' },
                { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'React Redux Typescript' },
            ]
        }
    }
};

module.exports = config;