const path = require('path');
const config = require('./webpack.config.js');

// TODO exclude vendor files!!
config.entry = {
  shiitake: './src',
};

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].min.js',
};

delete config.devServer;
delete config.devtool;

module.exports = config;
