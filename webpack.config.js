/**
 * Created by xuanjiu on 17/6/20.
 */
const path = require('path');
const webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  resolve: {
   modules: [
     path.join(__dirname, "src"),
     "node_modules"
   ],
   extensions: ['.js', '.jsx', '.css', '.less', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'dropZone': __dirname + "/src/lib/vue2-dropZone/src/index.vue"
    }
  }, 
  context: __dirname + "/src",
  entry: {
    statisticApp: ['./statisticApp.js', 'whatwg-fetch'],
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    filename: '[name].min.js',
    publicPath: './',
    chunkFilename: '[name].min.js?[hash:8]'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ],

  },
  // devtool: '#eval-source-map',
  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve( __dirname ,'./'),
    // match the output path

    publicPath: '/build'
    // match the output `publicPath`
  },
  // watch: true,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
