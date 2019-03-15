const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const prodWebpackConfig = {
  mode: 'production',
  context: path.resolve(__dirname),
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public/build/'),
    publicPath: '/build/',
    filename: '[name].[hash].js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
    new AssetsPlugin(),
    new ExtractTextPlugin('[name].bundle.css'),
    new CompressionPlugin(),
    new TerserPlugin({
      terserOptions: {
        warnings: false,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|png|jpe?g|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['url-loader?limit=10000'],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loaders: ['file-loader'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules/'),
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'}),
      },
      {
        test: /\.module\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=[local]__[hash:5]!sass-loader',
        }),
      },
    ],
  },
};

module.exports = prodWebpackConfig;
