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
    Route::get('auth/refresh', 'AuthController@refresh');

    # user
    Route::get('me', 'UserController@me');

    # Articles
    Route::get('articles', 'ArticleController@index');

    # User Preference
    Route::get('user-preferences', 'PersonalizationController@getUserPreferences');
    Route::put('update-preferences', 'PersonalizationController@updatePreferences');
    Route::post('user-authors', 'UserAuthorController@store');
    Route::post('user-sources', 'UserSourceController@store');
    Route::post('user-categories', 'UserCategoryController@store');

    # Categories, sources & authors
    Route::get('sources', 'SourceController@getAllSources');
    Route::get('categories', 'CategoryController@getAllCategories');
    Route::get('authors', 'AuthorController@getAllAuthors');
});
