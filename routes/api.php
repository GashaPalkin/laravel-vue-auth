<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::resource('/posts', PostController::class);

// custom method search
Route::get('/posts/search/{search}', [PostController::class, 'search']);

// ****************************************************************
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// ****************************************************************
// Route::group(['middleware' => 'auth:sanctum'], function () {  
//     Route::get('/', [App\Http\Controllers\HomeController::class, 'index']);
// });
