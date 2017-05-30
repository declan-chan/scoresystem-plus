const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');

const ROOT_PATH = resolve(__dirname, '../');
const SRC_PATH = resolve(ROOT_PATH, 'src');
const DIST_PATH = resolve(ROOT_PATH, 'dist');


module.exports = {
  context: SRC_PATH,

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: DIST_PATH,

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },
  resolve: {
    enforceModuleExtension: false,
    extensions: ['.js', '.jsx'],
    // mainFields: ['jsnext:main', 'main'],
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: DIST_PATH,
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};