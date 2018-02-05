const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../dst');
const APP_DIR = path.resolve(__dirname, './');
const isProduction = process.env.NODE_ENV === 'production';
const scriptName = isProduction ? 'bundle.min.js' : 'bundle.js';

module.exports = {
    entry: './index.js',
    output: {
        path: BUILD_DIR,
        filename: scriptName,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                include: APP_DIR,
                exclude: /node_modules/,
                options: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0',
                    ],
                },
            },
            {
                test: /\.js?$/,
                loader: 'eslint-loader',
                include: APP_DIR,
            },
            {
                test: /\.png/,
                loader: 'url-loader?limit=100000&name=/images/[name].[ext]',
            },
            {
                test: /\.jpg/,
                loader: 'file-loader?&name=/images/[name].[ext]',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        modules: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'node_modules'),
        ],
    },
    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: '../dst',
        host: '0.0.0.0',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            scriptPath: `/${scriptName}`,
            inject: false,
        }),
        new CopyWebpackPlugin([
            {
                from: './__mocks__',
                to: '../dst/__mocks__',
                toType: 'dir',
            },
        ]),
    ],
};
