const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  target: 'web',
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    noParse: [
      /\/react\//g,
      /\/react-dom\//g,
      /\/react-router\//g
    ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    filename: 'bundle.js',
    port: 3000,
    hot: true,
    noInfo: true,
    compress: true,
    open: true,
    watchContentBase: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      cache: path.join(__dirname, "node_modules", ".cache", "parallel-uglify"),
      parallel: true,
    })],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new WebpackNotifierPlugin({
      onlyOnError: true,
      title: (params) => {
        return `Build status is ${params.status} with message ${params.message}`;
      }
    }),
  ],
  devtool: 'cheap-module-source-map'
};

module.exports = config;