const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './demo/index.jsx',
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'demo'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  devServer: {
    contentBase: './demo',
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
  },
};
