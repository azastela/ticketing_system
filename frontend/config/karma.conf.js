module.exports = function (config) {
  var testWebpackConfig = require('./webpack.test.js');
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './frontend/config/karma-test-shim.js', watched: false}
    ],

    preprocessors: {
      './frontend/config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: testWebpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};
