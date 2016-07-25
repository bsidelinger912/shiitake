const webpack = require('webpack');
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
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        include: __dirname,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    /* eslint no-param-reassign:0 */
    // this handles a bad require in cheerio for the package
    new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, (result) => {
      if (/cheerio/.test(result.context)) {
        result.request = './package.json';
      }
    }),
  ],
  devServer: {
    contentBase: './dev',
    noInfo: true, //  --no-info option
    hot: true,
    inline: true,
  },
};
