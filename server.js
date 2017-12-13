const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('./webpack/webpack.dev.config');
const compiler = webpack(config);

const express = require('express');
const app = express();

const serverPort = 8080;
const root = path.resolve(__dirname, '.');

app.use(webpackDevMiddleware(compiler, {
    stats: {
        colors: true
    },
    noInfo: false
}));

app.get('/planet/*', (req, res, next) => {
    res.sendFile(path.join(root, '/index.html'));
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join(root, '/index.html'));
});

app.listen(serverPort, (err, res) => err ? handleError(err) : console.log(`App served on port ${serverPort}`));

function handleError(err) {
    switch (err.code) {
        case 'EACCES':
            console.error(`port ${serverPort} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`port ${serverPort} is already in use`);
            process.exit(1);
            break;
        default:
            console.log(err);
            process.exit(1);
    }
}