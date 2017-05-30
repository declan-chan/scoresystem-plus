const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');

const ROOT_PATH = resolve(__dirname, '../');
const SRC_PATH = resolve(ROOT_PATH, 'src');
const DIST_PATH = resolve(ROOT_PATH, 'dist');

var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  context: SRC_PATH,

  entry: {
    app: './index.js'
    // the entry point of our app
  },
  output: {
    // filename: '[name].js',
    filename: 'bundle.js',
    // the output bundle

    path: DIST_PATH,
  },
  resolve: {
    enforceModuleExtension: false,
    extensions: ['.js', '.jsx'],
    mainFields: ['jsnext:main', 'main'],
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
        use: [ 'style-loader', 'css-loader', ],
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
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),

    new webpack.LoaderOptionsPlugin({
       minimize: true
    }),

    new UglifyJSPlugin({
      beautiful: false,
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告  
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),

    new webpack.optimize.AggressiveMergingPlugin(), //合并块
    //把入口文件里面的数组打包成verdors.js
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendors',
    //   filename: 'vendors.bundle.js'
    // }),
    //提取不同入口文件中相同的依赖库，生成vendors文件
    //然而我们只有一个app入口文件呀，就不用common了

    // new HtmlwebpackPlugin({
    //   title: 'Hello World app'
    // })
    //gzip打包
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

  ],
};