const config = require('./webpack.config.js');

config.entry = [
  './dev/index.jsx',
];

delete config.devServer;
delete config.devtool;

module.exports = config;
