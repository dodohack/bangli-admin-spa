
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/main.ts',
        'style': './sass/admin.scss'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
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

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};

