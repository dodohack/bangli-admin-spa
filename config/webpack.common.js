
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor':    './app/vendor.ts',
        'app':       './app/main.ts',
        'style':     './sass/style.scss',
        'froala_style':   './less/froala2/froala2.less'
    },

    resolve: {
        extensions: ['', '.js', '.ts', '.css', '.sass', '.less']
    },

    module: {
        /* Do not parse legacy packages such as: jquery, froala */
        /* FIXME: This code works, but webpack forces to add extra wrapper to
         * generated file.
         */
        /*
        noParse: [
            /node_modules[\/\\]jquery[\/\\]dist[\/\\]jquery\.min\.js$/,
            /froala2[\/\\].*\.js$/
        ],
        */

        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css!sass"),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css!less"),
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },

    sassLoader: {
        includePaths: [helpers.root('node_modules')]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills'],
            filename: '[name].[hash].js'
        }),

        new ExtractTextPlugin("style.css"),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

