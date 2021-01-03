const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const PACKAGE = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, './dst');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const scriptName = isProduction ? 'bundle.min.js' : 'bundle.js';

    return {
        entry: './src/index.js',
        output: {
            path: BUILD_DIR,
            filename: scriptName,
        },
        performance: {
            hints: isProduction ? 'warning' : false,
        },
        target: isProduction ? 'browserslist' : 'web',
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    include: APP_DIR,
                    exclude: /node_modules/,
                },
                {
                    test: /\.js?$/,
                    loader: 'eslint-loader',
                    include: APP_DIR,
                },
                {
                    test: /\.(jpg|png)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]',
                            esModule: false,
                        },
                    }],
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
            hot: true,
            contentBase: './dst/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './src/index.html',
                scriptPath: `/${scriptName}?v${PACKAGE.version}`,
                inject: false,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './src/static',
                        to: './dst/static',
                    },
                ],
            }),
        ],
    };
};
