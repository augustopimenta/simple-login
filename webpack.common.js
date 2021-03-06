const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: resolve(__dirname, 'build'),
        pathinfo: true
    },
    context: resolve(__dirname, 'src')
};