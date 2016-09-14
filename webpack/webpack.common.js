var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        polyfills:    './app/polyfills.ts',
        vendor:       ['./app/vendor.ts', 'jquery', './froala/js/froala.js'],
        app:          './app/main.ts',
        style:        './sass/style.scss',
        froala:       './froala/less/froala.less'
    },

    resolve: {
        extensions: ['', '.js', '.ts', '.sass', '.less']
    },

    module: {
        loaders: [
            { test: /\.ts$/,   loader: 'ts' },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.html$/, loader: 'html' }
        ]
    },

    plugins: [
        // Inject jquery definition, so that we can build froala js code
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills'],
            filename: '[name].js'
        }),

        // TODO: Need to extra css from generated .js files by using this,
        // but do not want to to put it here
        //new ExtractTextPlugin("style.css"),


        // Copy static images and resource files to public
        new CopyWebpackPlugin([
            // Copy static images to folder {output}/images
            { from: 'images', to: 'images'},
            
            // Copy fontawesome fonts to folder {output}/fonts
            { from: 'node_modules/font-awesome/fonts', to: 'fonts' }
        ])
    ]
};

