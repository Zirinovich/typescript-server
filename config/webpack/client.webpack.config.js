var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ManifestPlugin = require('webpack-manifest-plugin');

//#region copySync, createIfDoesntExist
const copySync = (src, dest, overwrite) => {
    if (overwrite && fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
};

const createIfDoesntExist = dest => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
};

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');
copySync('./src/favicon.ico', './build/public/favicon.ico', true);
//#endregion

const NODE_ENV = (process.env.NODE_ENV === 'production' ? 'production' : 'development');

var config = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/redux'],
    },
    output: {
        path: path.resolve('./build/public'),
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'react-hot-loader/webpack!awesome-typescript-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.scss$/,
                include: path.resolve('./src/client/'),
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader?sourceMap'
                ]
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: {
                    failOnHint: true
                },
                postcss: function () {
                    return [
                        stylelint({
                            files: '../../src/app/*.css'
                        }),
                        postcssNext(),
                        postcssAssets({
                            relative: true
                        }),
                    ];
                },
            }
        }),
        new ManifestPlugin({
            fileName: '../manifest.json'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
    ]

};

if (NODE_ENV === 'development') {
    var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

    config.entry = {
        app: [
            'webpack-hot-middleware/client?reload=true',
            './src/client.tsx',
            './src/client/vendor.ts'
        ]
    };
    config.output.filename = 'js/[name].js';
    config.output.pathinfo = true;

    config.module.rules.push(
        {
            test: /\.css$/,
            include: path.resolve('./src/client'),
            loaders: [
                'style-loader',

                'css-loader?modules&importLoaders=2',
                'postcss-loader'
            ]
        },
        {
            test: /\.css$/,
            exclude: path.resolve('./src/client'),
            loaders: [
                'style-loader',
                'css-loader'
            ]
        }
    );

    config.plugins.push(
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

    config.devtool = 'source-map';
}

if (NODE_ENV === 'production') {
    var ExtractTextPlugin = require('extract-text-webpack-plugin');

    config.entry = {
        app: './src/client.tsx',
        vendor: [
            './src/client/vendor.ts',
            'react',
            'react-dom',
            'react-router',
            'react-helmet',
            'react-redux',
            'react-router-redux',
            'redux',
            'redux-connect',
            'redux-thunk'
        ]
    };
    config.output.filename = 'js/[name].[chunkhash].js';

    config.module.rules.push(
        {
            test: /\.css$/,
            include: path.resolve('./src/app'),
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
                    'postcss-loader'
                ]
            })
        },
        {
            test: /\.css$/,
            exclude: path.resolve('./src/app'),
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: [
                    'css-loader',
                ]
            })
        }
    );

    config.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].[chunkhash].js',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('css/[name].[hash].css')
    );

    config.bail = true;
}

module.exports = config;
