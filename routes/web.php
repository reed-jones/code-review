<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{catchall?}', 'Web\AppController@show')
  ->where('catchall', '^(?!api).*$')
  // ->where('catchall', '^(?!hmr).*$')
  ->name('app');