const common = require('./webpack.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChromeExtManifestPlugin = require('./ChromeExtManifestPlugin.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    devtool: 'source-map',
    bail: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['react-app']],
                        compact: true
                    }
                },
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                minimize: true,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    require('autoprefixer')({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9',
                                        ],
                                        flexbox: 'no-2009'
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                }) 
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[ext]'
                        }  
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new CleanWebpackPlugin(['build']),
        new ExtractTextPlugin({
            filename: 'css/style.[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                comparisons: false,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
            sourceMap: true,
        }),
        new ChromeExtManifestPlugin()
    ]
});