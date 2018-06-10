'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';

var modules = require('./webpack.modules.js');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path');

var project = {

	name: '.vue-template',
	output: 'dist'
};

project.path = path.resolve(__dirname, project.name);

module.exports = {

    context: project.path,

    //=======================================================================================================
    //  For cases when we should copy 'index.html' file into 'dist' directory
    //=======================================================================================================
    /*
    entry: [
        './index-template.html',
        './src/main.js'
    ],
    */

    entry: {
        app: './src/main.js'
    },

    output: {
        path: path.resolve(project.path, project.output),
        filename: './build.js'
    },

    //=======================================================================================================
    //  Watch for changes in development mode only
    //=======================================================================================================
    watch: NODE_ENV === 'development',

    //=======================================================================================================
    //  Make source-map enabled in development mode only
    //=======================================================================================================
    devtool: NODE_ENV === 'development' ? 'source-map':false,

    //=======================================================================================================
    //  Set server path to project folder
    //=======================================================================================================
    devServer: {
        contentBase: project.path
    },

    //=======================================================================================================
    //  Set alias to include 'vue.esm.js' build as 'vue' to use it with modedrn builders such as webpack 2.0+
    //=======================================================================================================
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },

    module: modules(project),

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new ExtractTextPlugin("./build.css", {allChunks: true})

        /*
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets/images',
            toType: 'dir'
        }])
        */

        /*
        new HtmlWebpackPlugin({
            title: 'Life Vue',
            template: './src/index.html',
            minify: NODE_ENV === 'production'
        })
        */
   ]
};

if (process.env.NODE_ENV === 'production') {

    module.exports.plugins = (module.exports.plugins || []).concat([
        new UglifyJSWebpackPlugin({
            sourceMap: false,
        })
    ])
}