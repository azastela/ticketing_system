var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './frontend/polyfills.ts',
    'vendor': './frontend/vendor.ts',
    'app': './frontend/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('frontend', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('frontend', 'app'),
        loader: 'raw'
      },
     // Load globally applied styles here (public).
      {
        test: /\.scss$/,
        exclude: helpers.root('frontend', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass')
      },

      // Load component styles here. When loaded with styleUrls in component, string of styles expected.
      {
        test: /\.scss$/,
        include: helpers.root('frontend', 'app'),
        loader: 'raw!sass'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('public', 'index.html')
    })
  ]
};
