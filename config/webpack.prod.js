'use strict'

// Modules
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const buildPath = path.resolve('./dist')

function getConfig(isProd) {
  let mode = isProd ? 'production' : 'development'
  let devtool = isProd ? 'source-map' : 'inline-source-map'
  let cssLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'

  return {
    mode: mode,
    devtool: devtool,
    output: {
      path: buildPath,
      filename: '[name].js',
      libraryTarget: "umd",
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            { loader: cssLoader },
            {
              loader: 'css-loader',
              options: {
                  sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  sourceMap: true
              }
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
              options: {
                  sourceMap: true
              }
            }
          ]
        }, //end css
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader'
        },
        {
          test: /\.html$/,
          loader: 'raw-loader'
        }
      ] //end rules
    }, //end modules
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      })
    ]
  }

}

let prodConfig = getConfig(true)
prodConfig.entry = { 'lib.min': './src/app/app.js' }
prodConfig.plugins.push(
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    allChunks: true
  }),
  // Copy assets from the public folder
  // Reference: https://github.com/kevlened/copy-webpack-plugin
  new CopyWebpackPlugin([{
    from: path.resolve('./src/public')
  }])
)

let devConfig = getConfig(false)
devConfig.entry = { 'lib': './src/app/app.js' }

module.exports = [
  devConfig,
  prodConfig
]
