'use strict'

// Modules
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event
const isTest = ENV === 'test' || ENV === 'test-watch'
const isProd = ENV === 'build'

console.log('ENV: ', ENV);
console.log('process.env: ', process.env)

module.exports = (function makeWebpackConfig () {
  /**
    * Config
    * Reference: http://webpack.github.io/docs/configuration.html
    * This is the object where all configuration gets set
    */
  const config = {}

  config.mode = isProd ? 'production' : 'development'

  /**
    * Entry
    * Reference: http://webpack.github.io/docs/configuration.html#entry
    * Should be an empty object if it's generating a test build
    * Karma will set this when it's a test build
    */
  config.entry = isTest ? void 0 : {
    app: './src/app/app.js'
  }

  /**
    * Output
    * Reference: http://webpack.github.io/docs/configuration.html#output
    * Should be an empty object if it's generating a test build
    * Karma will handle setting it up for you when it's a test build
    */
  config.output = isTest ? {} : {
    // Absolute output directory
    path: __dirname + '/dist',

    // Output path from the view of the page
    // Uses webpack-dev-server in development
    publicPath: '/',

    // Filename for entry points
    // Only adds hash in build mode
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    // Filename for non-entry points
    // Only adds hash in build mode
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  }

  /**
    * Devtool
    * Reference: http://webpack.github.io/docs/configuration.html#devtool
    * Type of sourcemap to use per build type
    */
  if (isTest) {
    config.devtool = 'inline-source-map'
  } else if (isProd) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval-source-map'
  }

  /**
    * Loaders
    * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
    * List: http://webpack.github.io/docs/list-of-loaders.html
    * This handles most of the magic responsible for converting modules
    */
  config.module = {
    rules: [
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   loader: 'eslint-loader',
    //   exclude: /node_modules/,
    //   options: {
    //       cache: true
    //   }
    // },
    {

      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
      ]
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      // You can add here any file extension you want to get copied to your output
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file-loader'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  }

  /**
    * Plugins
    * Reference: http://webpack.github.io/docs/configuration.html#plugins
    * List: http://webpack.github.io/docs/list-of-plugins.html
    */
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ]

  // Skip rendering index.html in test mode
  if (!isTest) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body'
      }),

      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        disable: !isProd
        //allChunks: true
      })
    )
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      // Copy assets from the public folder
      // Reference: https://github.com/kevlened/copy-webpack-plugin
      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }

  /**
    * Dev server configuration
    * Reference: http://webpack.github.io/docs/configuration.html#devserver
    * Reference: http://webpack.github.io/docs/webpack-dev-server.html
    */
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
    host: '127.0.0.1'
  }

  return config
}())
