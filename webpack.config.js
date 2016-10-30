var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/__compiled__');
var APP_DIR = path.resolve(__dirname, 'src/scripts');
var CONTENT_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: ((process.env.NODE_ENV === 'production') ? 'bundle.min.js' : 'bundle.js'),
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                include: APP_DIR,
                test: /\.jsx?$/,
                query: {
                    cacheDirectory: true,
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0'),
                    ],
                },
            },
            {
                loader: 'eslint-loader',
                include: APP_DIR,
                test: /\.jsx?$/,
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
    },
    eslint: {
        configFile: '.eslintrc',
    },
    devServer: {
        historyApiFallback: true,
        contentBase: CONTENT_DIR,
    },
};
