const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './dev/index.jsx',
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dev'),
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
      {
        test: /\.css$/,
        include: __dirname,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: './dev',
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
  },
};
