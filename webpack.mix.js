// TODO: setup a proper webpack for laravel projects

const mix = require('laravel-mix');

mix.webpackConfig({
    module: {
      rules: [
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
        // {
        //     test: /\.css$/,
        //     loaders: [
        //       'vue-style-loader',
        //       {
        //         loader: 'css-loader',
        //         options: {
        //           // enable CSS Modules
        //           modules: true,
        //           // customize generated class names
        //           localIdentName: '[local]_[hash:base64:8]'
        //         }
        //       }
        //     ]
        // }
      ]
    }
  });

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/main.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
