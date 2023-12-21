<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('{any}', fn () => view('home'))->where('any', '.*');

// * или так ?
// Route::get('{any}', [App\Http\Controllers\HomeController::class, 'index'])->where('any', '.*');
