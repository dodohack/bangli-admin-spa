var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

var styleExtractor  = new ExtractTextPlugin("style.[hash].css");
var froalaExtractor = new ExtractTextPlugin("froala.[hash].css");

module.exports = {
    entry: {
        polyfills:    './app/polyfills.ts',
        vendor:       ['./app/vendor.ts', 'jquery', './froala/js/froala.js'],
        app:          './app/main.ts',
        style:        './sass/style.scss',
        froala:       './froala/less/froala.less'
    },

    resolve: {
        extensions: ['', '.js', '.ts', '.css', '.sass', '.less']
    },

    module: {
        loaders: [
            { test: /\.ts$/,   loader: 'ts' },
            { test: /\.scss$/, loader: styleExtractor.extract("css!sass") },
            { test: /\.less$/, loader: froalaExtractor.extract("css!less") },
            { test: /\.html$/, loader: 'html' }
        ]
    },

    plugins: [
        // Inject jquery definition, so we can build use froala js
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills', 'style', 'froala'],
            filename: '[name].[hash].js'
        }),

        // Extra stylesheet from generated [name].[hash].js file to .css file
        styleExtractor,
        froalaExtractor,

        // Generate {output}/index.html with
        new HtmlWebpackPlugin({ template: 'index.html' }),

        // Copy static images and resource files to public
        new CopyWebpackPlugin([
            // Copy static images to folder {output}/images
            { from: 'images', to: 'images'},
            
            // Copy fontawesome fonts to folder {output}/fonts
            { from: 'node_modules/font-awesome/fonts', to: 'fonts' },
        ])
    ]
};

