var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = (process.env.NODE_ENV === 'production' ? 'production' : 'development');

var ExtractPlugin = new ExtractTextPlugin(NODE_ENV === 'production' ? 'css/styles-[hash].css' : 'css/styles.css');

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
            /*
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader'
            },
            */
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
                test: /\.css$/,
                include: path.resolve('./src'),
                exclude: path.resolve('./src/client/common/content'),
                loader: ExtractPlugin.extract({
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
                loader: ExtractPlugin.extract({
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
                loader: ExtractPlugin.extract({
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
                loader: ExtractPlugin.extract({
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
        new webpack.ProvidePlugin({ // так же типы надо добавлять в tsconfig.json - "types": ["node","jquery","lodash","moment","joi","reflect-metadata","ts-events"],
            $: "jquery",
            jQuery: "jquery",
            _: "lodash",
            classNames: "classnames"
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: {
                    failOnHint: false
                },
                postcss: function () {
                    return [
                        stylelint({
                            files: './src/app/*.css'
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
        ExtractPlugin
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

    config.plugins.push(
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );

    config.devtool = 'source-map';
}

if (NODE_ENV === 'production') {
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
        })
    );

    config.bail = true;
}

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

module.exports = config;


/*
 * Для формирования файлов в полноценной древовидной структуре каталогов приложения в выходной дирректории(речь идет о файлах картинок, шрифтов, svg, и т.п.),
 * можно для file-loader или url-loader прописать, например, следующую конфигурацию:
 * {
 *    test: /\.svg(\?.*)?$/,
 *    loader: 'file-loader?name=[path][hash].[ext]&context=' +path.resolve("src/client")
 * }
 * При этом context указывать надо обязательно(т.к. этот config-файл лежит не в корневой дирректории проекта).
 * Но это не поможет в случае, когда ресурс будет использовать из каталога node_modules.
 * Для того, что б сделать всё полноценно, необходимо каким то образом менять динамически контекст, в зависимости от исходного пути файла.
 * На текущий момент это не удалось. Возможно поможет параметр regExp, но с ним тоже не всё понятно.
 * loader: 'file-loader?name=[path][hash].[ext]&regExp=(.*\/node_modules|.* \/src\/client)&context=[0]'
 * */
