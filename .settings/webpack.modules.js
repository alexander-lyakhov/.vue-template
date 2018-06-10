'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';

var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

//===========================================
// export webpack 'module (loaders)' section
//===========================================
module.exports = function(project) {

	return {

        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}}
                    ]
                })

            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader', options: {
                            data: '@import "variables";',
                            includePaths: [
                                path.resolve(project.path, 'src/styles')
                            ]
                        }}
                    ]
                })
            },

            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: NODE_ENV === 'production'}},
                        {loader: 'sass-loader?indentedSyntax'}
                    ]
                })
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
                    loaders: {
                        js: 'babel-loader',
                        scss: 'vue-style-loader!css-loader?minimize=true!sass-loader?outputStyle=expanded',
                        sass: 'vue-style-loader!css-loader?minimize=true!sass-loader?indentedSyntax'
                    }
                }
            },

            /*
             *  Rules for images
             */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                    publicPath: project.output + '/assets/images' // prefix for compiled css
                }
            },

            /*
             *  Rules for fonts
             */
            {
                test: /\.(eot|ttf|eof|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts',
                    publicPath: 'assets/fonts' // prefix for compiled css
                }
            },

            /*
             *  Copy index.html in 'dist' directory
             */
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: 'index.html',
                    outputPath: '/',
                    publicPath: '/'
                }
            },

            /*
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader?limit=1024'
            }
            */
        ]
	}
}
