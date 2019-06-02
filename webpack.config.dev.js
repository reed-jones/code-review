'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const notifier = require('node-notifier');
const path = require('path')
const rimraf = require("rimraf");


module.exports = {
  mode: 'development',
  entry: {
    'js/main': './resources/js/main'
  },
  output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
      hotUpdateMainFilename: 'hot/[hash].hot-update.json'
  },
  resolve: {
    extensions: ['.vue', '.js', '.json', '.wasm', '.mjs'],
    alias: {
      '@': path.resolve(__dirname, 'resources/js')
    }
  },
  devServer: {
    writeToDisk: true,
    quiet: true,
    public: 'localhost:8080', // un-changable due to Laravel dependency
    host: '0.0.0.0',
    overlay: {
      warnings: false,
      errors: true
    },
    publicPath: '/',
    disableHostCheck: true,
    hot: true,
    inline: true,
    before: _ => {
      // create 'public/hot' folder so Laravel's 'mix' function
      // redirects to localhost:8080
      const fs = require('fs');
      const dir = path.resolve(__dirname, 'public', 'hot');

      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
    }
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: true,
    builtAt: false,
    entrypoints: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    publicPath: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // this matches plain `<style>` or `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader' ,
            options: {
              import: path.resolve(__dirname, 'resources/stylus/transparent.styl')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart:['node -e ' + (() => {
        rimraf.sync(path.resolve(__dirname, 'public', 'chunks'));
        rimraf.sync(path.resolve(__dirname, 'public', 'hot'));
        rimraf.sync(path.resolve(__dirname, 'public', 'js'));
      })() ]
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        // messages: ['You application is running here http://localhost:3000'],
        // notes: ['Some additional notes to be displayed upon successful compilation']
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: "Webpack error :(",
          subtitle: error.file || '',
          message: severity + ': ' + error.name,
          // icon: ICON
        });
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,

      // add formatters and transformers (see below)
      additionalFormatters: [],
      additionalTransformers: []
    }),
    new VueLoaderPlugin(),
    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: '/'
    })
  ]
}