var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var publicFolderName = ".public";

module.exports = {
    entry: [
        'babel-polyfill',
        './src/app/main'
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.scss']
    },
    eslint: {
        configFile: './.eslintrc'
    },
    output: {
        path: __dirname + '/' + publicFolderName,
        publicPath: './',
        filename: 'application.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('application.css', {
            allChunks: true
        })
    ],
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['jscs-loader'],
                include: path.join(__dirname, 'src')
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            },
            {
                test: /\.(png|jpg|gif)$//*, loader: 'file-loader'*/,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ],
            },
            {
                test: /\.(json)$/, loader: 'json-loader'
            },
            {
              test: /(\.mp3)$/,
              include: /(static)/,
              loaders: [
                'file?name=[path][name].[ext]&context=./src',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ],
            },
            {
                test   : /\.(ttf|eot|svg|woff|otf)(\?[a-z0-9]+)?$/,
                loader : 'file'
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['Android >= 2.3', 'iOS >= 7', 'Chrome >= 46'] })
    ],
    eslint: {
        configFile: './.eslintrc',
    },
    jscs: {
        // JSCS errors are displayed by default as warnings.
        // Set `emitErrors` to `true` to display them as errors.
        emitErrors: true,

        // JSCS errors do not interrupt the compilation.
        // Set `failOnHint` to `true` if you want any file with
        // JSCS errors to fail.
        failOnHint: false,
    }
};
