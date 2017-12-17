const common = require('./webpack.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChromeExtManifestPlugin = require('./ChromeExtManifestPlugin.js');

module.exports = merge(common, {
    devtool: 'source-map',
    bail: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['react-app']],
                    }
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
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
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
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
                'NODE_ENV': '"development"'
            }
        }),
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ChromeExtManifestPlugin()
    ]
});