const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

function ChromeExtManifestPlugin() {

}

ChromeExtManifestPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        const stats = compilation.getStats().toJson();

        const assets = stats.assets.reduce((files, stat) => {
            if (/\.js$/.test(stat.name)) {
                files.js.push(stat.name);
            }
            if (/\.css$/.test(stat.name)) {
                files.css.push(stat.name);
            }
            return files;
        }, {css: [], js: []});

        let manifest = JSON.parse(fs.readFileSync('./src/manifest.json'));

        manifest.background.scripts = assets.js;

        manifest.content_scripts = [
            {
                "matches": ["*://*/*"],
                "css": assets.css,
                "js": ['popup.js']
            }
        ];

        const manifestData = JSON.stringify(manifest, null, 4);

        compilation.assets['popup.js'] = {
            source: function() {
                return '';
            },
            size: function() {
                return 0;
            }
        };

        compilation.assets['manifest.json'] = {
            source: function() {
                return manifestData;
            },
            size: function() {
                return manifestData.length;
            }
        };

        callback();
    });
};

module.exports = {
    entry: './index.js',
    output: {
        filename: 'js/[name].[chunkhash].js',
        path: resolve(__dirname, 'build'),
        pathinfo: true,
    },
    context: resolve(__dirname, 'src'),
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
                        presets: [['react-app']]
                    }
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ChromeExtManifestPlugin()
    ]
};