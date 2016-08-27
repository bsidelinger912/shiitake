const path = require('path');
const config = require('./webpack.config.js');

// TODO exclude vendor files!!
config.entry = {
  shiitake: './src',
};

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].min.js',
  library: 'Shiitake',
  libraryTarget: 'umd',
};

config.externals = {
  // Use external version of React
  react: 'React',
  'react-dom': 'ReactDOM',
};

delete config.devServer;
delete config.devtool;

module.exports = config;
