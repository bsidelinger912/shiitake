const webpack = require('karma-webpack');
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    files: [
      'test/*.spec.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    frameworks: ['mocha'],
    plugins: [
      webpack,
      'karma-mocha',
      'karma-spec-reporter',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.js': 'webpack',
    },

    reporters: ['spec'],

    // web server port
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: false,
      stats: {
        assets: false,
        chunks: false,
        modules: false,
      },
    },
  });
};
