<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('register', 'RegisterController@register');
});

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::post('auth/logout', 'AuthController@logout');
    Route::post('auth/refresh', 'AuthController@refresh');

    # user
    Route::get('me', 'UserController@me');

    # Articles
    Route::get('articles', 'ArticleController@index');

    # User Preference
    Route::get('user-authors', 'UserAuthorController@index');
    Route::post('user-authors', 'UserAuthorController@store');
    Route::delete('user-authors/{id}', 'UserAuthorController@destroy');
    Route::get('user-sources', 'UserSourceController@index');
    Route::post('user-sources', 'UserSourceController@store');
    Route::delete('user-sources/{id}', 'UserSourceController@destroy');
    Route::get('user-categories', 'UserCategoryController@index');
    Route::post('user-categories', 'UserCategoryController@store');
    Route::delete('user-categories/{id}', 'UserCategoryController@destroy');

    # Categories, sources & authors
    Route::get('sources', 'SourceController@getAllSources');
    Route::get('categories', 'CategoryController@getAllCategories');
    Route::get('authors', 'AuthorController@getAllAuthors');
});
