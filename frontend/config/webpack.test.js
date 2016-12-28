var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

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
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('frontend', 'app'),
        loader: 'null'
      },
      {
        test: /\.scss$/,
        include: helpers.root('frontend', 'app'),
        loader: 'raw!sass'
      },
      {
        test: /\.css$/,
        include: helpers.root('frontend', 'app'),
        loader: 'raw'
      }
    ]
  }
}
