var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    //devtool: 'source-map',

    output: {
        path: helpers.root('public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
        minimize: false // workaround for Angular2
    },

    plugins: [
        // If any error happens during the compiling, no file will be generated
        // if this plugin is enabled.
        //new webpack.NoErrorsPlugin(),
        
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': { 'ENV': JSON.stringify(ENV) }
        })
    ]

});

