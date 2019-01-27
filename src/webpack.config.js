const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const PACKAGE = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, '../dst');
const APP_DIR = path.resolve(__dirname, './');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const scriptName = isProduction ? 'bundle.min.js' : 'bundle.js';

    return {
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
                            '@babel/preset-react',
                            '@babel/preset-flow',
                            '@babel/preset-env',
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
                    loader: 'url-loader?limit=10000&name=/images/[name].[ext]',
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
                scriptPath: `/${scriptName}?v${PACKAGE.version}`,
                inject: false,
            }),
            new CopyWebpackPlugin([
                {
                    from: './static',
                    to: '../dst/static',
                    toType: 'dir',
                },
            ]),
        ],
    };
};
