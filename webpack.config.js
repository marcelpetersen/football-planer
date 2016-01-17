var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    'es6-shim/es6-shim.min',
    'reflect-metadata',
    'web-animations.min',
    'zone.js',
    "moment",
    path.join(__dirname, 'app', 'main', 'main.js')
  ],
  output: {
    path: path.join(__dirname, 'app', 'js'),
    filename: 'app.bundle.js',
    publicPath: 'js/',
    pathinfo: true // show module paths in the bundle, handy for debugging
  },
  devtool: "eval-cheap-module-source-map",
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "awesome-typescript-loader?doTypeCheck=false&useWebpackText=true",
        include: [path.join(__dirname, 'app')],
        exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'scripts')]
      },
      {
        test: /\.html$/
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
        include: [path.join(__dirname, 'app')],
        exclude: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'scripts')]
      },
      {
        // Loader to compile all of our SASS down.
        // Use the `resolve-url` pipe to convert the relative url paths to something this loader
        // can work with, e.g.: url('../my-file.png') => url('/path/to/my-file.png')
        // https://github.com/bholloway/resolve-url-loader
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "resolve-url", "autoprefixer?browsers=last 2 version", "sass?sourceMap"]
      },
      // Any png-image or woff-font below or equal to 100K will be converted
      // to inline base64 instead
      { test: /\.(png|woff|ttf)(\?.*)?$/, loader: 'url-loader?limit=1000000' }
    ]
  },
  resolve: {
    alias: {
      'ionic': 'ionic-framework',
      'web-animations.min': 'ionic-framework/js/web-animations.min',
    },
    extensions: ["", ".js", ".ts"]
  },
  // Sass loader configuration to tell webpack where to find the additional SASS files
  // it needs for `ionic`, located in the ionic-framework node module folder.
  // https://github.com/jtangelder/sass-loader#sass-options
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, "node_modules", 'ionic-framework', 'dist', 'src', 'scss')
    ]
  }
};
