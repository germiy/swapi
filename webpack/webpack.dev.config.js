const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, '../');

module.exports = {

    devtool: 'cheap-module-eval-source-map',

    entry: [
        'babel-polyfill',
        path.join(parentDir, 'script/index.js')
    ],

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },

    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }

};
