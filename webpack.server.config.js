var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var config = {
    externals: nodeModules,
    target: 'node',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
    },

    entry: './src/server.tsx',

    output: {
        path: path.resolve('./build'),
        filename: './server.js',
        publicPath: '/public/',
        libraryTarget: 'commonjs2'
    },

    module: {
        loaders: [{
            test: /\.(jpe?g|png|gif)$/i,
            loader: 'url-loader?limit=1000&name=public/images/[hash].[ext]'
        },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff&name=public/fonts/[hash].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=public/fonts/[hash].[ext]"
            },
            {
                test: /\.css$/,
                include: path.resolve('./src'),
                exclude: path.resolve('./src/client/common/content'),
                loader: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'isomorphic-style-loader',
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    }, {
                        loader: 'postcss-loader',
                    }]
                })
            },
            {
                test: /\.scss$/,
                include: path.resolve('./src'),
                exclude: path.resolve('./src/client/common/content'),
                loader: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'isomorphic-style-loader',
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]___[hash:base64:5]',
                        },
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            },
            {
                test: /\.css$/,
                include: path.resolve('./src/client/common/content'),
                loader: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'isomorphic-style-loader',
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]',
                        },
                    }, {
                        loader: 'postcss-loader',
                    }]
                })
            },
            {
                test: /\.scss$/,
                include: path.resolve('./src/client/common/content'),
                loader: ExtractTextPlugin.extract({
                    fallback: [{
                        loader: 'isomorphic-style-loader',
                    }],
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]',
                        },
                    }, {
                        loader: 'postcss-loader',
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            },
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false,
            options: {
                postcss: function () {
                    return [
                        postcssNext(),
                        postcssAssets({
                            relative: true
                        }),
                    ];
                },
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            classNames: "classnames"
        }),
        new ExtractTextPlugin(IS_PRODUCTION ? 'css/styles-[hash].css' : 'css/styles.css')
    ],

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    }
};

const copySync = (src, dest, overwrite) => {
    if (overwrite && fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
}

const createIfDoesntExist = dest => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
}

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');
copySync('./src/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
